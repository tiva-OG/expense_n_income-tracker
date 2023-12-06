import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useContext } from 'react';

import { ExpenseContext, IncomeContext } from './contextProvider';

export default function FilterPopper(props) {
  const { type } = props;
  const Context = type === 'expense' ? ExpenseContext : IncomeContext;
  const { anchor, select, data, name, account, category, amount, date, actions } = useContext(Context);

  const { anchorEl, setAnchorEl } = anchor;
  const { selectOpen, setSelectOpen } = select;
  const { rows, minAmt, maxAmt } = data;
  const { filterName, setFilterName } = name;
  const { filterAccount, setFilterAccount } = account;
  const { filterCategory, setFilterCategory } = category;
  const { filterAmount, setFilterAmount } = amount;
  const { filterDate, setFilterDate } = date;
  const { resetFilter } = actions;

  const open = Boolean(anchorEl);
  const accountOptions = Array.from(new Set(rows.map((row) => row.account)));
  const categoryOptions = Array.from(new Set(rows.map((row) => row.category.name)));

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement='bottom-end'
      transition
      style={{ width: anchorEl ? anchorEl.clientWidth : null }}>
      {({ TransitionProps }) => (
        <ClickAwayListener
          onClickAway={() => {
            if (!selectOpen) return setAnchorEl(null);
          }}>
          <Fade {...TransitionProps}>
            <Paper
              style={{
                display: 'flex',
                padding: 15,
                flexDirection: 'row',
              }}>
              <Grid container spacing={3}>
                <Grid item lg={2} md={2}>
                  <TextField
                    label='name'
                    type='text'
                    size='small'
                    value={filterName}
                    onChange={(e) => {
                      setFilterName(e.target.value);
                    }}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ style: { fontSize: 12 } }}
                  />
                </Grid>
                <Grid item lg={2} md={2}>
                  <TextField
                    label='account'
                    type='text'
                    size='small'
                    select
                    fullWidth
                    value={filterAccount}
                    onChange={(e) => setFilterAccount(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ style: { fontSize: 12 } }}
                    SelectProps={{
                      value: filterAccount,
                      onChange: (e) => setFilterAccount(e.target.value),
                      onOpen: () => setSelectOpen(true),
                      MenuProps: {
                        TransitionProps: {
                          onExited: () => setSelectOpen(false),
                        },
                      },
                    }}>
                    {accountOptions.map((option) => (
                      <MenuItem key={option} value={option} style={{ fontSize: 12 }}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item lg={3} md={2}>
                  <TextField
                    label='category'
                    type='text'
                    size='small'
                    value={filterCategory}
                    select
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ style: { fontSize: 12 } }}
                    SelectProps={{
                      multiple: true,
                      value: filterCategory,
                      onChange: (e) => setFilterCategory(e.target.value),
                      onOpen: () => setSelectOpen(true),
                      MenuProps: {
                        TransitionProps: {
                          onExited: () => setSelectOpen(false),
                        },
                      },
                    }}>
                    {categoryOptions.map((option) => (
                      <MenuItem key={option} value={option} style={{ fontSize: 12 }}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item lg={3} md={2}>
                  <div>
                    <Typography
                      style={{
                        fontSize: 12,
                        marginBottom: '9px',
                        color: 'primary',
                      }}>
                      amount
                    </Typography>
                    <Slider
                      value={filterAmount}
                      onChange={(event, newValue) => {
                        setFilterAmount(newValue);
                      }}
                      valueLabelDisplay='auto'
                      min={minAmt}
                      max={maxAmt}
                    />
                  </div>
                </Grid>
                <Grid item lg={2} md={2}>
                  <TextField
                    label='date'
                    type='text'
                    size='small'
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ style: { fontSize: 12 } }}
                  />
                </Grid>
                <Box>
                  <Button style={{ textTransform: 'none' }} onClick={resetFilter}>
                    <Typography variant='body2' color='primary'>
                      Reset Filters
                    </Typography>
                  </Button>
                </Box>
              </Grid>
            </Paper>
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  );
}
