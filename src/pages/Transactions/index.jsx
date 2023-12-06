import { Box, Grid, Paper } from '@material-ui/core';
import { useStyles } from './transactionsStyles';
import ExpenseTable from './ExpenseTable';
import IncomeTable from './IncomeTable';

export default function Transactions() {
  const classes = useStyles();

  return (
    <Box
      style={{
        display: 'flex',
        marginTop: '3rem',
        marginBottom: '3rem',
        justifyContent: 'space-between',
      }}>
      <Grid container style={{ marginLeft: '2rem', justifyContent: 'space-between' }}>
        {/* Expense Table */}
        <Grid item lg={8}>
          <Paper className={classes.paper}>
            <ExpenseTable />
          </Paper>
        </Grid>
        {/* Expense Chart */}
        <Grid item lg={3} style={{ display: 'flex' }}>
          <Paper className={classes.paper}>
            <h1>Expense Chart</h1>
          </Paper>
        </Grid>
        {/* Income Table */}
        <Grid item lg={8} style={{ marginTop: '2rem' }}>
          <Paper className={classes.paper}>
            <IncomeTable />
          </Paper>
        </Grid>
        <Grid item lg={3} style={{ display: 'flex', marginTop: '2rem' }}>
          <Paper className={classes.paper}>
            <h1>Income Chart</h1>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
