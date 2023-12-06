import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  cell: {
    padding: '8px',
    overflowWrap: 'break-word',
  },

  head: {
    fontWeight: 500,
    textAlign: 'left',
    backgroundColor: '#fafafa',
  },

  row: {
    '&:nth-of-type(even)': {
      backgroundColor: '#fafafa',
    },
  },

  root: {
    width: '100%',
    borderCollapse: 'collapse',
    position: 'relative',
  },
}));
