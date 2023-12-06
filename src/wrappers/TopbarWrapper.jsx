import React from 'react';
import { createStyles, makeStyles, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import ThemeWrapper from './ThemeWrapper';

const useStyles = makeStyles((theme) =>
  createStyles({
    topbarWrapper: {
      height: '100%',
      position: 'relative',
    },
    letterBox: {
      backgroundColor: '#212121',
      padding: theme.spacing(2),
      height: '100%',
    },
  })
);

const useBackgroundStyles = makeStyles((theme) =>
  createStyles({
    area: {
      backgroundColor: theme.palette.background.default,
      maxWidth: 1000,
      height: '100%',
      overflowY: 'scroll',
      margin: 'auto',
      position: 'relative',
    },
  })
);

function Background({ children }) {
  const classes = useBackgroundStyles();

  return (
    <Paper variant='outlined' square className={classes.area}>
      {children}
    </Paper>
  );
}

export default function TopbarWrapper({ children }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.topbarWrapper}>
        <div className={classes.letterBox}>
          <Background>{children}</Background>
        </div>
      </div>
    </>
  );
}
