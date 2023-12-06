import { useState } from 'react';
import { Box, Grid, Paper } from '@material-ui/core';
import { useStyles } from './accountsStyles';
import AccountsTable from './AccountsTable';
import TransferForm from './TransferForm';

import { createDetail } from './utils/data';
import { AccountsContext } from './contextProvider';

const data = [
  createDetail(0, 'sandra', 'cash', 76000, 21000),
  createDetail(1, 'aliyah', 'card', 1800, 2000),
  createDetail(2, 'joe', 'bank', 400000, 35000),
  createDetail(3, 'peter', 'cash', 15000, 5000),
  createDetail(4, 'aliyah', 'card', 200000, 62000),
];

export default function Accounts() {
  const classes = useStyles();

  const [rows, setRows] = useState(data);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <AccountsContext.Provider
      value={{
        modal: { modalOpen, setModalOpen },
        data: { rows, setRows },
      }}>
      <Box
        style={{
          display: 'flex',
          marginTop: '3rem',
          justifyContent: 'space-between',
        }}>
        <Grid container style={{ marginLeft: '2rem', justifyContent: 'space-between' }}>
          {/* Accounts Table */}
          <Grid item lg={8}>
            <Paper className={classes.paper}>
              <AccountsTable />
            </Paper>
          </Grid>
          {/* Transfer Form */}
          <Grid item lg={3} style={{ display: 'flex' }}>
            <Paper className={classes.paper}><TransferForm /></Paper>
          </Grid>
        </Grid>
      </Box>
    </AccountsContext.Provider>
  );
}
