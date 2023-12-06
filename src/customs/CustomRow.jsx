import { withStyles } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';

const CustomRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default CustomRow;
