import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import MainList from './MainList';
import SecondaryList from './SecondaryList';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawerPaper: {
    position: 'static',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [selected, setSelected] = useState(0);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Hidden mdDown>
      <Box className={classes.root}>
        <Drawer
          variant='permanent'
          open
          classes={{ paper: classes.drawerPaper }}>
          <MainList selected={selected} setSelected={setSelected} />
          <Divider />
          <SecondaryList selected={selected} setSelected={setSelected} />
        </Drawer>
      </Box>
    </Hidden>
  );
}
