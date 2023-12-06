import clsx from 'clsx';
import { Box, Container, Grid, Paper } from '@material-ui/core';
import { useStyles } from './dashboardStyles';
import Accounts from '../Accounts';

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Box className={classes.content}>
      <Container maxWidth='lg' className={classes.container}>
        <Grid container spacing={3}>
          {/* Accounts */}
          <Grid item>
            <Paper className={classes.paper}>
              <h1>Hello World</h1>
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          {/* Recent Transactions */}
        </Grid>
      </Container>
    </Box>
  );
}
