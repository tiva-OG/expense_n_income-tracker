import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterListOutlined';
import { useLayoutEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';

import FilterPopper from './FilterPopper';
import CustomCell from '../../customs/CustomCell';
import CustomRow from '../../customs/CustomRow';
import CustomHead from '../../customs/CustomHead';
import TablePaginationActions from '../../components/Pagination/TablePaginationActions';
import { ExpenseContext, IncomeContext } from './contextProvider';
import { getComparator, stableSort } from './utils/sort';
import { equalRange, getMax, getMin } from './utils/calc';
import AddForm from './AddForm';

const useStyles = makeStyles((theme) => ({
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  root: {
    marginTop: '10px',
    width: '100%',
    display: 'flex',
  },
  caption: {
    color: '#11381e',
    marginRight: '20em',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  blue: { background: '#caeff7' },
  orange: { background: '#fce0e7' },
  green: { background: '#d9fce4' },
  purple: { background: '#f3edff' },
}));

export default function DataTable(props) {
  const { id, data, type } = props;

  const Context = type === 'expense' ? ExpenseContext : IncomeContext;
  const classes = useStyles();
  const headers = [
    { id: 'name', numeric: false, label: 'Name' },
    { id: 'account', numeric: false, label: 'Account' },
    { id: 'category', numeric: false, label: 'Category' },
    { id: 'amount', numeric: true, label: 'Amount' },
    { id: 'date', numeric: true, label: 'Date' },
  ];

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectOpen, setSelectOpen] = useState(false);
  const [rows, setRows] = useState(data);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterPopper = () => {
    setAnchorEl(anchorEl ? null : document.getElementById(id));
  };

  let maxAmt = getMax(rows, 'amount');
  let minAmt = getMin(rows, 'amount');
  let accountOptions = Array.from(new Set(rows.map((row) => row.account)));
  let categoryOptions = Array.from(new Set(rows.map((row) => row.category.name)));

  const [filterName, setFilterName] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterAccount, setFilterAccount] = useState('');
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterAmount, setFilterAmount] = useState([minAmt, maxAmt]);

  const [appliedFilters, setAppliedFilters] = useState([]);
  const [data2Display, setData2Display] = useState(rows);

  const addFilter = (filter) => {
    setAppliedFilters((current) => {
      if (current.includes(filter)) return current;
      return [...current, filter];
    });
  };

  const removeFilter = (filter) => {
    setAppliedFilters((current) => current.filter((e) => e !== filter));
  };

  const resetFilter = () => {
    setFilterName('');
    setFilterDate('');
    setFilterAccount('');
    setFilterCategory([]);
    setFilterAmount([minAmt, maxAmt]);

    setAppliedFilters([]);
  };

  useLayoutEffect(() => {
    maxAmt = getMax(rows, 'amount');
    minAmt = getMin(rows, 'amount');
    accountOptions = Array.from(new Set(rows.map((row) => row.account)));
    categoryOptions = Array.from(new Set(rows.map((row) => row.category.name)));
    resetFilter();
    setData2Display(rows);
    setPage(0);
  }, [rows]);

  useLayoutEffect(() => {
    const filteredRows = rows
      .filter((row) => {
        if (filterName !== '') {
          addFilter('name');
          try {
            const regEx = new RegExp(filterName, 'gi');
            return row.name.match(regEx);
          } catch {
            return row.name.indexOf(filterName) !== -1;
          }
        }
        removeFilter('name');
        return true;
      })
      .filter((row) => {
        if (filterAccount !== '') {
          addFilter('account');
          try {
            const regEx = new RegExp(filterAccount);
            return row.account.match(regEx);
          } catch {
            return row.account.indexOf(filterItem) !== -1;
          }
        }
        removeFilter('account');
        return true;
      })
      .filter((row) => {
        if (filterCategory.length > 0) {
          addFilter('category');
          return filterCategory.includes(row.category.name);
        }
        removeFilter('category');
        return true;
      })
      .filter((row) => {
        if (!equalRange([minAmt, maxAmt], filterAmount)) {
          addFilter('amount');
          const [min, max] = filterAmount;
          return row.amount >= min && row.amount <= max;
        }
        removeFilter('amount');
        return true;
      })
      .filter((row) => {
        if (filterDate !== '') {
          addFilter('date');
          try {
            const regEx = new RegExp(filterDate, 'gi');
            return row.date.match(regEx);
          } catch {
            return row.date.indexOf(filterDate) !== -1;
          }
        }
        removeFilter('date');
        return true;
      });
    setData2Display(filteredRows);
    setPage(0);
  }, [filterName, filterAccount, filterCategory, filterAmount, filterDate]);

  return (
    <Context.Provider
      value={{
        anchor: { anchorEl, setAnchorEl },
        select: { selectOpen, setSelectOpen },
        modal: { modalOpen, setModalOpen },
        data: { rows, setRows, minAmt, maxAmt },
        name: { filterName, setFilterName },
        account: { filterAccount, setFilterAccount },
        category: { filterCategory, setFilterCategory },
        amount: { filterAmount, setFilterAmount },
        date: { filterDate, setFilterDate },
        actions: { addFilter, removeFilter, resetFilter },
      }}>
      <Box style={{ minWidth: 600 }}>
        <Box className={classes.top}>
          <Typography variant='h6' color='primary'>
            {type}
          </Typography>
          <Box display='flex'>
            <Button style={{ textTransform: 'none' }} onClick={() => setModalOpen(true)}>
              <Typography variant='overline' color='primary'>
                + add {type}
              </Typography>
            </Button>
            <AddForm type={type} context={Context} />
            <Divider orientation='vertical' flexItem />
            <Button onClick={handleFilterPopper} disableElevation>
              <Badge color='primary' badgeContent={appliedFilters.length}>
                <FilterListIcon color='primary' style={{ fontSize: 20 }} />
              </Badge>
            </Button>
          </Box>
        </Box>
        <Table>
          <CustomHead
            id={id}
            headers={headers}
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <FilterPopper type={type} />
          <TableBody>
            {stableSort(data2Display, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <CustomRow tabIndex={-1} key={row.id}>
                    <CustomCell>{row.name}</CustomCell>
                    <CustomCell>{row.account}</CustomCell>
                    <CustomCell>
                      {<Chip className={classes[row.category.class]} label={row.category.name} size='small' />}
                    </CustomCell>
                    <CustomCell align='right'>{row.amount}</CustomCell>
                    <CustomCell align='right'>{row.date}</CustomCell>
                  </CustomRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[4]}
          component='div'
          count={data2Display.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
          labelDisplayedRows={({ from, to, count }) => `${from} - ${to} of ${count}`}
          classes={{ root: classes.root, caption: classes.caption }}
        />
      </Box>
    </Context.Provider>
  );
}
