import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import data from './data/mock.json';
import { useStyles } from './style';

const headers = [
  { id: 'id', numeric: false, label: 'ID' },
  { id: 'first_name', numeric: false, label: 'First Name' },
  { id: 'last_name', numeric: false, label: 'Last Name' },
  { id: 'email', numeric: false, label: 'Email' },
  { id: 'phone', numeric: false, label: 'Phone' },
];
const rows = data;

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.root}>
        <TableHead className={classes.head}></TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} >
              <TableCell component='th' scope='row'>
                {row.id}
              </TableCell>
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
