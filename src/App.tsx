import React from 'react';
// 3rd party libraries
import { AccountBalanceOutlined, InsertChartOutlined } from '@mui/icons-material';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
// Components
import Accounts from './components/accounts/Accounts.tsx';
import Analysis from './components/trackers/Analysis.tsx';
// CSS
import './App.css';

const App = () => {
  return (
    <div className="App">
      <div id="main">
        <div id="navigation">
          <img className='empower-logo' src="https://mma.prnewswire.com/media/1097404/Empower_Logo.jpg" />
          {/* <Link to="/">My Accounts</Link> */}
          {/* <Link to="/trackers">Trackers</Link> */}
          <a className="nav-item" href="/"><AccountBalanceOutlined className="nav-item-icon" />All Accounts</a>
          <a className="nav-item" href="/analysis"><InsertChartOutlined className="nav-item-icon" />Analysis</a>
        </div>
        <div id="main-content">
          <Router basename="/">
            <Routes>
              <Route path="/">
                <Route index element={<Accounts />} />
                <Route path="/analysis" element={<Analysis />} />
              </Route>
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
