import * as yup from 'yup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useContext } from 'react';
import { Formik, Form } from 'formik';

import { AccountsContext } from './contextProvider';
import { createData, createDetail, nextId } from './utils/data';

const accountInitials = {
  name: '',
  type: '',
  email: '',
  currency: '',
  deposit: '',
};

const accountSchema = yup.object().shape({
  name: yup.string().required('account name is required'),
  type: yup.string().required('select type of account'),
  email: yup.string().email('invalid email').required('email is required'),
  currency: yup.string().required('select currency for account'),
  deposit: yup.number().required('enter a deposit to account'),
});

const types = ['bank', 'card', 'cash'];
const currencies = [
  { currency: 'NGN', label: '₦' },
  { currency: 'GHS', label: '¢' },
  { currency: 'USD', label: '$' },
  { currency: 'EUR', label: '€' },
  { currency: 'JPY', label: '¥' },
];

export default function AddAccountForm() {
  const { data, modal } = useContext(AccountsContext);

  const { rows, setRows } = data;
  const { modalOpen, setModalOpen } = modal;

  // add currency selected to amount at start
  const handleFormSubmit = (values) => {
    const newData = createData(nextId(rows), values.name, values.type, values.email, values.currency, values.deposit);
    // what to do with `newData`
    const newDetail = createDetail(newData.id, newData.name, newData.type, newData.deposit, 0);
    setRows([newDetail, ...rows]);
    setModalOpen(false);
  };

  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <Box
        style={{
          position: 'absolute',

          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 400,
        }}>
        <Paper
          style={{
            display: 'flex',
            padding: 15,
            flexDirection: 'column',
          }}>
          <Typography
            variant='subtitle2'
            color='primary'
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 10,
              marginBottom: 20,
              letterSpacing: '2px',
              textDecoration: 'underline',
            }}>
            add a new account
          </Typography>
          <Formik initialValues={accountInitials} validationSchema={accountSchema} onSubmit={handleFormSubmit}>
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <Form>
                <Grid display='grid' container spacing={2}>
                  <Grid item lg={6} md={6}>
                    <TextField
                      name='name'
                      id='name'
                      label='name'
                      type='text'
                      size='small'
                      variant='outlined'
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      InputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}
                    />
                  </Grid>
                  <Grid item lg={6} md={6}>
                    <TextField
                      name='type'
                      id='type'
                      label='type'
                      type='text'
                      size='small'
                      variant='outlined'
                      required
                      fullWidth
                      select
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.type}
                      error={!!touched.type && !!errors.type}
                      helperText={touched.type && errors.type}
                      InputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}>
                      {types.map((option) => (
                        <MenuItem key={option} value={option} style={{ fontSize: 12 }}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item lg={12} md={12}>
                    <TextField
                      name='email'
                      id='email'
                      label='email'
                      type='text'
                      size='small'
                      variant='outlined'
                      required
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      InputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}
                    />
                  </Grid>
                  <Grid item lg={6} md={6}>
                    <TextField
                      name='currency'
                      id='currency'
                      label='currency'
                      size='small'
                      variant='outlined'
                      required
                      select
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.currency}
                      error={!!touched.currency && !!errors.currency}
                      helperText={touched.currency && errors.currency}
                      fullWidth
                      InputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}>
                      {currencies.map((option) => (
                        <MenuItem key={option.currency} value={option.currency} style={{ fontSize: 12 }}>
                          {option.currency + ' - ' + option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item lg={6} md={6}>
                    <TextField
                      name='deposit'
                      id='deposit'
                      label='deposit'
                      type='number'
                      size='small'
                      variant='outlined'
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.deposit}
                      error={!!touched.deposit && !!errors.deposit}
                      helperText={touched.deposit && errors.deposit}
                      InputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}
                    />
                  </Grid>
                </Grid>
                {/* Submit Button */}
                <Button type='submit' fullWidth style={{ marginTop: '2rem' }} variant='contained' color='primary'>
                  add account
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Modal>
  );
}
