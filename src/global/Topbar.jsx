import React from 'react';
import {
  AppBar,
  fade,
  IconButton,
  InputBase,
  makeStyles,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceOutlined';
import SearchIcon from '@material-ui/icons/SearchOutlined';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  logoButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Appbar() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.logoButton}
            color='inherit'>
            <AccountBalanceIcon />
          </IconButton>
          <Typography className={classes.title} variant='h6'>
            MyAPP
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search...'
              classes={{ root: classes.inputRoot, input: classes.inputInput }}
            />
          </div>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...others } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...others}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

export default function Topbar() {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (newTabIndex) => setTabIndex(newTabIndex);

  return (
    <div>
      <Appbar />
      <AppBar position='static' id='topbar-nav-id'>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant='scrollable'
          scrollButtons='auto'>
          <Tab label='Dashboard' />
          <Tab label='Transactions' />
          <Tab label='Accounts' />
          <Tab label='Reports' />
          <Tab label='Wishlist' />
          <Tab label='Settings' />
        </Tabs>
      </AppBar>

      {/* <div>
        <TabPanel value={tabIndex} index={0}>
          <Dashboard />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <Transactions />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <Accounts />
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <Reports />
        </TabPanel>
        <TabPanel value={tabIndex} index={4}>
          <Wishlist />
        </TabPanel>
        <TabPanel value={tabIndex} index={5}>
          <Settings />
        </TabPanel>
      </div> */}
    </div>
  );
}
