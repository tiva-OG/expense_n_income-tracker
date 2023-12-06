import React from 'react';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import AssessmentIcon from '@material-ui/icons/AssessmentOutlined';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SwapHorizIcon from '@material-ui/icons/SwapHorizOutlined';
import ShoppingCartIcon from '@material-ui/icons/AddShoppingCartOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@material-ui/core';

export const mainListItems = (
  <Box>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary='Dashboard' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SwapHorizIcon />
      </ListItemIcon>
      <ListItemText primary='Transactions' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AccountBalanceWalletIcon />
      </ListItemIcon>
      <ListItemText primary='Accounts' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText primary='Reports' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary='Wishlist' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary='Settings' />
    </ListItem>
  </Box>
);

export const secondaryListItems = (
  <Box>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Current month' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Last quarter' />
    </ListItem>
  </Box>
);
