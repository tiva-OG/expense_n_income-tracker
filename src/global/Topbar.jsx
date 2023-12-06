import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { fade, makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceOutlined';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import CustomTab from '../customs/CustomTab';
import CustomTabs from '../customs/CustomTabs';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
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
    marginLeft: theme.spacing(5),
    width: '35%',
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

function Searchbar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' to='/' component={Link}>
            <AccountBalanceIcon />
          </IconButton>
          <Typography variant='h6'>MyAPP</Typography>
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

const tabStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(1),
  },
  tabs: {
    backgroundColor: '#2e1534',
  },
}));

export default function Topbar() {
  const classes = tabStyles();
  const [tabId, setTabId] = React.useState(0);

  const handleTabChange = (event, newTabId) => setTabId(newTabId);

  return (
    <div>
      <Searchbar />
      <Hidden lgUp>
        <div className={classes.tabs}>
          <CustomTabs value={tabId} onChange={handleTabChange}>
            <CustomTab label='Dashboard' to='/' component={Link} />
            <CustomTab
              label='Transactions'
              to='/transactions'
              component={Link}
            />
            <CustomTab label='Accounts' to='/accounts' component={Link} />
            <CustomTab label='Reports' />
            <CustomTab label='Wishlist' />
            <CustomTab label='Settings' />
          </CustomTabs>
          <Typography className={classes.padding} />
        </div>

        {/* <AppBar position='static'>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            variant='fullWidth'
            indicatorColor='secondary'
            scrollButtons='auto'>
            <Tab label='Dashboard'  />
            <Tab label='Transactions' />
            <Tab label='Accounts' />
            <Tab label='Reports' />
            <Tab label='Wishlist' />
            <Tab label='Settings' />
          </Tabs>
        </AppBar> */}
      </Hidden>
    </div>
  );
}
