import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import AssessmentIcon from '@material-ui/icons/AssessmentOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SwapHorizIcon from '@material-ui/icons/SwapHorizOutlined';
import ShoppingCartIcon from '@material-ui/icons/AddShoppingCartOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

// doesn't fully display list item
function LinkItem(props) {
  const { to, itemId } = props;
  return (
    <ListItem
      button
      to={to}
      component={Link}
      selected={selected === itemId}
      onClick={(event) => handleClick(event, itemId)}
    />
  );
}

export default function MainList(props) {
  const { selected, setSelected } = props;
  const handleClick = (event, item) => {
    setSelected(item);
  };

  return (
    <List>
      <ListItem
        button
        selected={selected === 0}
        onClick={(event) => handleClick(event, 0)}
        to='/'
        component={Link}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItem>
      <ListItem
        button
        selected={selected === 1}
        onClick={(event) => handleClick(event, 1)}
        to='/transactions'
        component={Link}>
        <ListItemIcon>
          <SwapHorizIcon />
        </ListItemIcon>
        <ListItemText primary='Transactions' />
      </ListItem>
      <ListItem
        button
        selected={selected === 2}
        onClick={(event) => handleClick(event, 2)}
        to='/accounts'
        component={Link}>
        <ListItemIcon>
          <AccountBalanceWalletIcon />
        </ListItemIcon>
        <ListItemText primary='Accounts' />
      </ListItem>
      <ListItem
        button
        selected={selected === 3}
        onClick={(event) => handleClick(event, 3)}>
        <ListItemIcon>
          <AssessmentIcon />
        </ListItemIcon>
        <ListItemText primary='Reports' />
      </ListItem>
      <ListItem
        button
        selected={selected === 4}
        onClick={(event) => handleClick(event, 4)}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary='Wishlist' />
      </ListItem>
      <ListItem
        button
        selected={selected === 5}
        onClick={(event) => handleClick(event, 5)}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary='Settings' />
      </ListItem>
    </List>
  );
}
