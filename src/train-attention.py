# import os
import json
import time
from nltk.translate.bleu_score import corpus_bleu
from os.path import exists, join


import torch.backends.cudnn as cudnn
import torch.optim
import torch.nn as nn
import torch.utils.data
import torchvision.transforms as transforms
from torch.nn.utils.rnn import pack_padded_sequence

from data_processes.datasets import CaptionDataset
from data_processes.utils import (
    accuracy,
    adjust_learning_rate,
    AverageMeter,
    clip_gradient,
    save_checkpoint,
)
from models import Encoder, Decoder, DecoderWithAttention

### DATA PARAMETERS ###
data_folder = (
    "/INPUT Files"  # folder with data files created by `create_input_files.py`
)
data_name = "140_cap_per_img_2_min_word_freq"  # base-name shared by data files
save_path = "/Attention-Checkpoints"
# embed_name = None

### MODEL PARAMETERS ###
attention_dim = 512
decoder_dim = 512
emb_dim = 512
dropout = 0.5
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
cudnn.benchmark = True

### TRAINING PARAMETERS ###
epochs = 20
workers = 0
alpha_c = (
    1.0  # regularization parameter for `doubly stochastic attention`, as in the paper
)
grad_clip = 5.0
best_bleu4 = 0.0
batch_size = 64
start_epoch = 0
print_freq = 200
encoder_lr = 1e-4
decoder_lr = 4e-4
attention = True
checkpoint = (
    "./Attention-Checkpoints/5_checkpoint_140_cap_per_img_2_min_word_freq.pth.tar"
)
fine_tune_encoder = False
epochs_since_improvement = 0
pretrained_embeddings = None


def main():
    """
    Training and validation.

    :param attention (bool): Controls wether to apply attention to the model
    """
    global attention_dim, best_bleu4, checkpoint, data_name, emb_dim, epochs_since_improvement, fine_tune_encoder, pretrained_embeddings, start_epoch, word_map

    embed_file = join(data_folder, "EMBEDDINGS_" + data_name + ".pt")
    if exists(embed_file):
        pretrained_embeddings = torch.load(embed_file)
        emb_dim = pretrained_embeddings.shape[1]
    word_map_file = join(data_folder, "WORDMAP_" + data_name + ".json")
    with open(word_map_file, "r") as j:
        word_map = json.load(j)

    if checkpoint is None:
        attention_dim = attention_dim if attention else attention_dim is None

        encoder = Encoder()
        encoder.fine_tune(fine_tune_encoder)
        encoder_optimizer = (
            torch.optim.Adam(
                params=filter(lambda p: p.requires_grad, encoder.parameters()),
                lr=encoder_lr,
            )
            if fine_tune_encoder
            else None
        )

        decoder = build_decoder(
            decoder_dim,
            emb_dim,
            vocab_size=len(word_map),
            embeddings=pretrained_embeddings,
            attention_dim=attention_dim,
        )
        decoder_optimizer = torch.optim.Adam(
            params=filter(lambda p: p.requires_grad, decoder.parameters()),
            lr=decoder_lr,
        )

    else:
        checkpoint = torch.load(checkpoint)
        encoder = checkpoint["encoder"]
        decoder = checkpoint["decoder"]
        best_bleu4 = checkpoint["bleu-4"]
        encoder_optimizer = checkpoint["encoder_optimizer"]
        start_epoch = checkpoint["epoch"] + 1
        decoder_optimizer = checkpoint["decoder_optimizer"]
        epochs_since_improvement = checkpoint["epochs_since_improvement"]

        if fine_tune_encoder and encoder_optimizer is None:
            encoder.fine_tune(fine_tune_encoder)
            encoder_optimizer = torch.optim.Adam(
                params=filter(lambda p: p.requires_grad, encoder.parameters()),
                lr=encoder_lr,
            )

    encoder = encoder.to(device)
    decoder = decoder.to(device)

    criterion = nn.CrossEntropyLoss().to(device)
    normalize = transforms.Normalize(
        mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]
    )

    train_loader = torch.utils.data.DataLoader(
        CaptionDataset(
            data_folder, data_name, "TRAIN", transform=transforms.Compose([normalize])
        ),
        batch_size=batch_size,
        shuffle=True,
        num_workers=workers,
        pin_memory=True,
    )
    val_loader = torch.utils.data.DataLoader(
        CaptionDataset(
            data_folder, data_name, "VAL", transform=transforms.Compose([normalize])
        ),
        batch_size=batch_size,
        shuffle=True,
        num_workers=workers,
        pin_memory=True,
    )

    for epoch in range(start_epoch, epochs):
        if epochs_since_improvement == 20:
            break
        if epochs_since_improvement > 0 and epochs_since_improvement % 8 == 0:
            adjust_learning_rate(decoder_optimizer, 0.8)
            if fine_tune_encoder:
                adjust_learning_rate(encoder_optimizer, 0.8)

        train(
            train_loader=train_loader,
            encoder=encoder,
            decoder=decoder,
            criterion=criterion,
            encoder_optimizer=encoder_optimizer,
            decoder_optimizer=decoder_optimizer,
            epoch=epoch,
        )

        recent_bleu4 = validate(
            val_loader=val_loader, encoder=encoder, decoder=decoder, criterion=criterion
        )

        is_best = recent_bleu4 > best_bleu4
        best_bleu4 = max(recent_bleu4, best_bleu4)
        if not is_best:
            epochs_since_improvement += 1
            print(f"\nEpochs since last improvement: {epochs_since_improvement}\n")
        else:
            epochs_since_improvement = 0

        save_checkpoint(
            save_path,
            data_name,
            epoch,
            epochs_since_improvement,
            encoder,
            decoder,
            encoder_optimizer,
            decoder_optimizer,
            recent_bleu4,
            is_best,
        )


def build_decoder(
    decoder_dim, embed_dim, vocab_size, embeddings=None, attention_dim=None
):
    """
    Builds different variants of decoder.

    :param decoder_dim: decoder dimension
    :param embed_dim: embedding dimension
    :param vocab_size: vocabulary size
    :param embeddings: pretrained embeddings
    :param attention_dim: attention dimension
    """

    if attention:
        assert attention_dim is not None

        decoder = DecoderWithAttention(
            attention_dim=attention_dim,
            embed_dim=embed_dim,
            decoder_dim=decoder_dim,
            vocab_size=vocab_size,
            embeddings=embeddings,
            dropout=dropout,
        )
    else:
        decoder = Decoder(
            embed_dim=embed_dim,
            decoder_dim=decoder_dim,
            vocab_size=vocab_size,
            embeddings=embeddings,
            dropout=dropout,
        )

    return decoder


def train(
    train_loader,
    encoder,
    decoder,
    criterion,
    encoder_optimizer,
    decoder_optimizer,
    epoch,
):
    """
    Performs one epoch's training.

    :param train_loader: DataLoader for training data
    :param encoder: encoder model
    :param decoder: decoder model
    :param criterion: loss layer
    :param encoder_optimizer: optimizer to update encoder's weights (if fine-tuning)
    :param decoder_optimizer: optimizer to update decoder's weights
    :param epoch: epoch number
    """

    encoder.train()
    decoder.train()

    batch_time = AverageMeter()  # forward prop. + back prop. time
    data_time = AverageMeter()  # data loading time
    top5accs = AverageMeter()  # top5 accuracy
    losses = AverageMeter()  # loss (per word decoded)

    start = time.time()

    for i, (imgs, caps, caplens) in enumerate(train_loader):
        data_time.update(time.time() - start)

        imgs = imgs.to(device)
        caps = caps.to(device)
        caplens = caplens.to(device)

        imgs = encoder(imgs)
        if attention:
            scores, caps_sorted, decode_lengths, alphas, sort_ind = decoder(
                imgs, caps, caplens
            )
        else:
            scores, caps_sorted, decode_lengths, sort_ind = decoder(imgs, caps, caplens)

        targets = caps_sorted[:, 1:]
        scores = pack_padded_sequence(scores, decode_lengths, batch_first=True).data
        targets = pack_padded_sequence(targets, decode_lengths, batch_first=True).data

        loss = criterion(scores, targets)
        if attention:
            loss += alpha_c * ((1.0 - alphas.sum(dim=1)) ** 2).mean()

        decoder_optimizer.zero_grad()
        if encoder_optimizer is not None:
            encoder_optimizer.zero_grad()

        loss.backward()

        if grad_clip is not None:
            clip_gradient(decoder_optimizer, grad_clip)
            if encoder_optimizer is not None:
                clip_gradient(encoder_optimizer, grad_clip)

        decoder_optimizer.step()
        if encoder_optimizer is not None:
            encoder_optimizer.step()

        top5 = accuracy(scores, targets, 5)
        top5accs.update(top5, sum(decode_lengths))
        losses.update(loss.item(), sum(decode_lengths))
        batch_time.update(time.time() - start)

        start = time.time()

        if i % print_freq == 0:
            print(
                "Epoch: [{0}][{1}/{2}]\t"
                "Batch Time {batch_time.val:.3f} ({batch_time.avg:.3f})\t"
                "Data Load Time {data_time.val:.3f} ({data_time.avg:.3f})\t"
                "Loss {loss.val:.4f} ({loss.avg:.4f})\t"
                "Top-5 Accuracy {top5.val:.3f} ({top5.avg:.3f})".format(
                    epoch,
                    i,
                    len(train_loader),
                    batch_time=batch_time,
                    data_time=data_time,
                    loss=losses,
                    top5=top5accs,
                )
            )


def validate(val_loader, encoder, decoder, criterion):
    """
    Performs one epoch's validation.

    :param val_loader: DataLoader for validation data.
    :param encoder: encoder model
    :param decoder: decoder model
    :param criterion: loss layer
    :return: BLEU-4 score
    """

    if encoder is not None:
        encoder.eval()
    decoder.eval()

    batch_time = AverageMeter()
    top5accs = AverageMeter()
    losses = AverageMeter()

    start = time.time()

    references = list()  # references (true captions) for calculating BLEU-4 score
    hypotheses = list()  # hypotheses (predictions)

    with torch.no_grad():
        for i, (imgs, caps, caplens, allcaps) in enumerate(val_loader):
            imgs = imgs.to(device)
            caps = caps.to(device)
            caplens = caplens.to(device)

            if encoder is not None:
                imgs = encoder(imgs)
            if attention:
                scores, caps_sorted, decode_lengths, alphas, sort_ind = decoder(
                    imgs, caps, caplens
                )
            else:
                scores, caps_sorted, decode_lengths, sort_ind = decoder(
                    imgs, caps, caplens
                )

            targets = caps_sorted[:, 1:]
            scores_copy = scores.clone()
            scores = pack_padded_sequence(scores, decode_lengths, batch_first=True).data
            targets = pack_padded_sequence(
                targets, decode_lengths, batch_first=True
            ).data

            loss = criterion(scores, targets)
            if attention:
                loss += alpha_c * ((1.0 - alphas.sum(dim=1)) ** 2).mean()

            top5 = accuracy(scores, targets, 5)
            top5accs.update(top5, sum(decode_lengths))
            losses.update(loss.item(), sum(decode_lengths))
            batch_time.update(time.time() - start)

            start = time.time()

            if i % print_freq == 0:
                print(
                    "Validation: [{0}/{1}]\t"
                    "Batch Time: {batch_time.val:.3f} ({batch_time.avg:.3f})\t"
                    "Loss: {loss.val:.4f} ({loss.avg:.4f})\t"
                    "Top-5 Accuracy: {top5.val:.3f} ({top5.avg:.3f})\t".format(
                        i,
                        len(val_loader),
                        batch_time=batch_time,
                        loss=losses,
                        top5=top5accs,
                    )
                )

            # References
            allcaps = allcaps[sort_ind]
            for j in range(allcaps.shape[0]):
                img_caps = allcaps[j].tolist()
                img_captions = list(
                    map(
                        lambda c: [
                            w
                            for w in c
                            if w not in {word_map["<start>"], word_map["<pad>"]}
                        ],
                        img_caps,
                    )
                )
                references.append(img_captions)

            # Hypotheses
            _, preds = torch.max(scores_copy, dim=2)
            preds = preds.tolist()
            temp_preds = list()
            for j, p in enumerate(preds):
                temp_preds.append(preds[j][: decode_lengths[j]])
            preds = temp_preds
            hypotheses.extend(preds)

            assert len(references) == len(hypotheses)

        # Calculate BLEU-4 scores
        bleu4 = corpus_bleu(references, hypotheses)

        print(
            "\n * LOSS - {loss.avg:.3f}, TOP-5 ACCURACY - {top5.avg:.3f}, BLEU-4 - {bleu}\n".format(
                loss=losses, top5=top5accs, bleu=bleu4
            )
        )

    return bleu4


if __name__ == "__main__":
    main()
