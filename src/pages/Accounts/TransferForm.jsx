import * as yup from 'yup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useContext } from 'react';
import { Formik, Form } from 'formik';

import { AccountsContext } from './contextProvider';
import { createData, createDetail, nextId } from './utils/data';

const transferInitials = {
  from: '',
  to: '',
  amount: '',
  description: '',
};

const transferSchema = yup.object().shape({
  from: yup.string().required('sender is required'),
  to: yup.string().required('receiver is required'),
  amount: yup.number().required('please enter amount to be transferred'),
  description: yup.string(),
});

export default function TransferForm() {
  const { data } = useContext(AccountsContext);
  const { rows, setRows } = data;

  const names = Array.from(new Set(rows.map((row) => row.name)));

  const handleFormSubmit = (values) => {
    // not the best solution but does the job

    let sender = rows.find((row) => row.name === values.from);
    let receiver = rows.find((row) => row.name === values.to);

    const sender_amtOut = sender.amtOut + values.amount;
    const sender_bal = sender.amtIn - sender_amtOut;

    const receiver_amtIn = receiver.amtIn + values.amount;
    const receiver_bal = receiver_amtIn - receiver.amtOut;

    sender = { ...sender, amtOut: sender_amtOut, balance: sender_bal };
    receiver = { ...receiver, amtIn: receiver_amtIn, balance: receiver_bal };

    rows.splice(
      rows.findIndex((row) => row.id === sender.id),
      1
    );
    rows.splice(
      rows.findIndex((row) => row.id === receiver.id),
      1
    );

    // `setRows(newRows)` doesn't re-render accounts table
    {
      /* const newRows = rows.map((row) => {
      if (row.name !== values.from || row.name !== values.to) {
        return row;
      }
      // updating sender details
      if (row.name === values.from) {
        return { ...row, amtOut: row.amtOut + values.amount, balance: row.balance - values.amount };
      }
      // updating receiver details
      if (row.name === values.to) {
        return { ...row, amtIn: row.amtIn + values.amount, balance: row.balance + values.amount };
      }
    });
    setRows(newRows) */
    }

    setRows([sender, receiver, ...rows]);
  };

  return (
    <Box>
      <Typography
        variant='subtitle2'
        color='primary'
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 20,
          letterSpacing: '2px',
          textDecoration: 'underline',
        }}>
        move funds between accounts
      </Typography>
      <Formik initialValues={transferInitials} validationSchema={transferSchema} onSubmit={handleFormSubmit}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item lg={6} md={6}>
                <TextField
                  name='from'
                  id='from'
                  label='from'
                  type='text'
                  size='small'
                  variant='outlined'
                  required
                  fullWidth
                  select
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.from}
                  error={!!touched.from && !!errors.from}
                  helperText={touched.from && errors.from}
                  InputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}>
                  {names.map((option) => (
                    <MenuItem key={option} value={option} style={{ fontSize: 14 }}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item lg={6} md={6}>
                <TextField
                  name='to'
                  id='to'
                  label='to'
                  type='text'
                  size='small'
                  variant='outlined'
                  required
                  fullWidth
                  select
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.to}
                  error={!!touched.to && !!errors.to}
                  helperText={touched.to && errors.to}
                  InputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}>
                  {names.map((option) => (
                    <MenuItem key={option} value={option} style={{ fontSize: 14 }}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item lg={12} md={12}>
                <TextField
                  name='amount'
                  id='amount'
                  label='amount'
                  type='number'
                  size='small'
                  variant='outlined'
                  required
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.amount}
                  error={!!touched.amount && !!errors.amount}
                  helperText={touched.amount && errors.amount}
                  InputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                />
              </Grid>
              <Grid item lg={12} md={12}>
                <TextField
                  name='description'
                  id='description'
                  label='description'
                  size='small'
                  variant='outlined'
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  InputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
            {/* Submit Button */}
            <Button type='submit' fullWidth style={{ marginTop: '3rem' }} variant='contained' color='primary'>
              transfer
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
