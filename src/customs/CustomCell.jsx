import { fade, withStyles } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';

const CustomCell = withStyles((theme) => ({
  head: {
    backgroundColor: fade(theme.palette.primary.dark, 0.85),
    color: fade(theme.palette.secondary.contrastText, 0.85),
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default CustomCell;
