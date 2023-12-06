import Topbar from './global/Topbar';
import Sidebar from './global/Sidebar';
import { Box } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';

function App() {
  return (
    <Router>
      <Topbar />
      <Box display='flex'>
        <Sidebar />
        <main className='content'>
          <Switch>
            <Route path='/' exact>
              <Dashboard />
            </Route>
            <Route path='/accounts' exact>
              <Accounts />
            </Route>
            <Route path='/transactions' exact>
              <Transactions />
            </Route>
          </Switch>
        </main>
      </Box>
    </Router>
  );
}

export default App;
