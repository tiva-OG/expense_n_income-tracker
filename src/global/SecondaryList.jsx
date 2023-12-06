import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import { Link } from 'react-router-dom/cjs/react-router-dom';

export default function SecondaryList(props) {
  const { selected, setSelected } = props;

  const handleClick = (event, item) => {
    setSelected(item);
  };

  return (
    <List>
      <ListSubheader inset>Saved reports</ListSubheader>
      <ListItem
        button
        selected={selected === 6}
        onClick={(event) => handleClick(event, 6)} to='/' component={Link}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary='Current month' />
      </ListItem>
      <ListItem
        button
        selected={selected === 7}
        onClick={(event) => handleClick(event, 7)}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary='Last quarter' />
      </ListItem>
    </List>
  );
}
