import * as yup from 'yup';
import moment from 'moment/moment';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { useContext } from 'react';

import { createData, nextId } from './utils/data';

const filter = createFilterOptions();

const initials = {
  name: '',
  account: '',
  category: { name: '', class: '' },
  amount: '',
  date: moment().format('YYYY-MM-DD'),
};

const formatDate = (date) => {
  if (date) {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }
  return date;
};

const useStyles = makeStyles((theme) => ({
  autocomplete: { fontSize: 12 },
}));

const schema = yup.object().shape({
  name: yup.string().required('name is required'),
  account: yup.string().required('account is required'),
  category: yup.object().required('category is required'),
  amount: yup.number().required('amount is required'),
  date: yup.date().transform((value) => {
    return value ? moment(value).toDate() : value;
  }),
});

export default function AddForm(props) {
  const { type, context } = props;

  // categories is necessary from context
  const { data, modal } = useContext(context);

  const { rows, setRows } = data;
  const { modalOpen, setModalOpen } = modal;

  const classes = useStyles();
  const accountOptions = Array.from(new Set(rows.map((row) => row.account)));
  const categoryOptions = Array.from(new Set(rows.map((row) => row.category)));

  // maybe add currency selected adornment to amount at start
  const handleFormSubmit = (values) => {
    const newData = createData(
      nextId(rows),
      values.name,
      values.account,
      values.category.name,
      values.amount,
      formatDate(values.date)
    );
    setRows([newData, ...rows]);
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
            enter a new {type}
          </Typography>
          <Formik initialValues={initials} validationSchema={schema} onSubmit={handleFormSubmit}>
            {({ values, errors, touched, handleBlur, handleChange, setFieldValue }) => (
              <Form>
                <Grid display='grid' container spacing={2}>
                  <Grid item lg={12} md={12}>
                    <TextField
                      name='name'
                      id='name'
                      label='name'
                      type='text'
                      size='small'
                      variant='outlined'
                      required
                      fullWidth
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
                      name='account'
                      id='account'
                      label='account'
                      type='text'
                      size='small'
                      variant='outlined'
                      required
                      fullWidth
                      select
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.account}
                      error={!!touched.account && !!errors.account}
                      helperText={touched.account && errors.account}
                      InputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}>
                      {accountOptions.map((option) => (
                        <MenuItem key={option} value={option} style={{ fontSize: 12 }}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item lg={6} md={6}>
                    <Autocomplete
                      name='category'
                      size='small'
                      freeSolo
                      clearOnBlur
                      selectOnFocus
                      handleHomeEndKeys
                      options={categoryOptions}
                      value={values.category}
                      onChange={(e, value) => {
                        if (typeof value === 'string') {
                          // console.log('first condition: ', value);
                          setFieldValue('category', {
                            ...initials.category,
                            name: value,
                          });
                        } else if (value && value.inputValue) {
                          // console.log('second condition: ', value);
                          setFieldValue('category', {
                            ...initials.category,
                            name: value.inputValue,
                          });
                        } else {
                          // console.log('last condition: ', value);
                          setFieldValue('category', value);
                        }
                      }}
                      filterOptions={(options, params) => {
                        const filtered = filter(options, params);
                        const { inputValue } = params;
                        // suggest creating a new value
                        const isExisting = options.some((option) => inputValue === option.name);
                        if (inputValue !== '' && !isExisting) {
                          filtered.push({
                            inputValue,
                            name: `add '${inputValue}'`,
                          });
                        }
                        return filtered;
                      }}
                      getOptionLabel={(option) => {
                        // this for value selected with ENTER right from the input
                        if (typeof option === 'string') {
                          return option;
                        }
                        // add 'xxx' for option created dynamically
                        if (option.inputValue) {
                          return option.inputValue;
                        }
                        // this for the regular option
                        return option.name;
                      }}
                      renderOption={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label='category'
                          type='text'
                          size='small'
                          variant='outlined'
                          required
                          fullWidth
                          error={Boolean(touched.category && errors.category)}
                          helperText={touched.category && errors.category}
                          InputLabelProps={{ style: { fontSize: 12 } }}
                        />
                      )}
                      classes={{
                        inputRoot: classes.autocomplete,
                        option: classes.autocomplete,
                      }}
                    />
                  </Grid>

                  <Grid item lg={6}>
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
                      InputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}
                    />
                  </Grid>

                  <Grid item lg={6}>
                    <TextField
                      name='date'
                      id='date'
                      type='date'
                      size='small'
                      variant='outlined'
                      required
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.date}
                      error={!!touched.date && !!errors.date}
                      helperText={touched.date && errors.date}
                      InputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}
                    />
                  </Grid>
                </Grid>

                <Button type='submit' fullWidth style={{ marginTop: '2rem' }} variant='contained' color='primary'>
                  ENTER {type.toUpperCase()}
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Modal>
  );
}
