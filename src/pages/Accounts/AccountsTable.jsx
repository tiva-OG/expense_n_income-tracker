import { useContext, useLayoutEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import BankIcon from '@material-ui/icons/BusinessOutlined';
import CardIcon from '@material-ui/icons/CreditCardOutlined';
import CashIcon from '@material-ui/icons/MoneyOutlined';

import AddAccountForm from './AddAccountForm';
import CustomHead from '../../customs/CustomHead';
import CustomRow from '../../customs/CustomRow';
import CustomCell from '../../customs/CustomCell';
import { createDetail } from './utils/data';
import { stableSort, getComparator } from './utils/sort';
import { AccountsContext } from './contextProvider';

const accountIcons = {
  bank: <BankIcon />,
  card: <CardIcon />,
  cash: <CashIcon />,
};

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 800,
  },
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
  link: {
    '&.seeMore': {
      marginTop: theme.spacing(3),
    },
  },
}));

/**
 * if number of accounts > 4, the SEE ALL should display; and when clicked, it should show
 * all accounts
 */

export default function AccountsTable() {
  const { data, modal } = useContext(AccountsContext);

  const classes = useStyles();
  const headers = [
    { id: 'name', numeric: false, label: 'Name' },
    { id: 'type', numeric: false, label: 'Type' },
    { id: 'in', numeric: true, label: 'In' },
    { id: 'out', numeric: true, label: 'Out' },
    { id: 'balance', numeric: true, label: 'Balance' },
  ];

  const { rows, setRows } = data;
  const { modalOpen, setModalOpen } = modal;

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [data2Display, setData2Display] = useState(rows.slice(0, 4));
  const [showingAll, setShowingAll] = useState(rows.length <= 4);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSeeAll = () => {
    setShowingAll(!showingAll);
  };

  useLayoutEffect(() => {
    if (showingAll) {
      setData2Display(rows);
    } else {
      setData2Display(rows.slice(0, 4));
    }
    console.log(rows)

    setOrder('desc');
    setOrderBy('id');
  }, [rows, showingAll]);

  return (
    <Box className={classes.root}>
      <Box className={classes.top}>
        <Typography variant='h6' color='primary'>
          accounts
        </Typography>
        <Button style={{ textTransform: 'none' }} onClick={() => setModalOpen(true)}>
          <Typography variant='overline' color='primary'>
            + add account
          </Typography>
        </Button>
        <AddAccountForm />
      </Box>
      <Table>
        <CustomHead
          id='accountsTable'
          headers={headers}
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy))
            .slice(0, data2Display.length)
            .map((row, index) => {
              return (
                <CustomRow tabIndex={-1} key={row.id}>
                  <CustomCell>{row.name}</CustomCell>
                  <CustomCell>{<Chip label={row.type} size='small' icon={accountIcons[row.type]} />}</CustomCell>
                  <CustomCell align='right'>{row.amtIn}</CustomCell>
                  <CustomCell align='right'>{row.amtOut}</CustomCell>
                  <CustomCell align='right'>{row.balance}</CustomCell>
                </CustomRow>
              );
            })}
        </TableBody>
      </Table>
      <Button style={{ textTransform: 'none', marginTop: '0.8em' }} onClick={handleSeeAll}>
        <Typography variant='caption' color='primary'>
          {(function () {
            if (showingAll && rows.length <= 4) {
              return;
            }
            if (showingAll) {
              return '...see less';
            } else {
              return '... see more';
            }
          })()}
        </Typography>
      </Button>
    </Box>
  );
}
