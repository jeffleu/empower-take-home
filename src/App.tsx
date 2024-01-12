import React from 'react';
// 3rd party libraries
import { AccountBalanceOutlined, InsertChartOutlined } from '@mui/icons-material';
// Components
import Accounts from './components/accounts/Accounts.tsx';
import Trackers from './components/trackers/Trackers.tsx';
// CSS
import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <header>
        {/* <img className='empower-logo' src="https://mma.prnewswire.com/media/1097404/Empower_Logo.jpg" /> */}
      </header>
      <div id="main">
        <div id="navigation">
          <img className='empower-logo' src="https://mma.prnewswire.com/media/1097404/Empower_Logo.jpg" />
          {/* <Link to="/">My Accounts</Link> */}
          {/* <Link to="/trackers">Trackers</Link> */}
          <a className="nav-item" href="/"><AccountBalanceOutlined className="nav-item-icon" />All Accounts</a>
          <a className="nav-item" href="/trackers"><InsertChartOutlined className="nav-item-icon" />Trackers</a>
        </div>
        <div id="main-content">
          <Router basename="/">
            <Routes>
              <Route path="/">
                <Route index element={<Accounts />} />
                <Route path="/trackers" element={<Trackers />} />
              </Route>
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
