import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import CustomCell from './CustomCell';
import CustomRow from './CustomRow';

export default function CustomHead(props) {
  const {id, headers, classes, order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead id={id}>
      <CustomRow>
        {headers.map((header) => (
          <CustomCell
            key={header.id}
            align={header.numeric ? 'right' : 'left'}
            sortDirection={orderBy === header.id ? order : false}>
            <TableSortLabel
              active={orderBy === header.id}
              direction={orderBy === header.id ? order : 'asc'}
              onClick={createSortHandler(header.id)}>
              {header.label}
              {orderBy === header.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </CustomCell>
        ))}
      </CustomRow>
    </TableHead>
  );
}
