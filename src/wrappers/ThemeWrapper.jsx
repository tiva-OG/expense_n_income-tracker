import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  themeContainer: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: '100%',
  },
}));

function ThemeContainer({ children }) {
  const classes = useStyles();

  return (
    <Paper className={classes.themeContainer} elevation={0} square>
      {children}
    </Paper>
  );
}

export default function ThemeWrapper({ children }) {
  const themeObject = useSelector((state) => state.themeObject);

  return (
    <ThemeProvider theme={themeObject}>
      <ThemeContainer>{children}</ThemeContainer>
    </ThemeProvider>
  );
}
