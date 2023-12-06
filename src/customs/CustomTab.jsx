import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';

const CustomTab = withStyles((theme) => ({
  root: {
    minWidth: '16%',
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

export default CustomTab;