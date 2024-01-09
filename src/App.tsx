import React from 'react';
// Components
import Accounts from './components/accounts/Accounts.tsx';
// CSS
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header>
        <img className='empower-logo' src="https://mma.prnewswire.com/media/1097404/Empower_Logo.jpg"/>
      </header>
      <div id="main">
        <div id="navigation"></div>
        <div id="main-content">
          <Accounts/>
        </div>
      </div>
    </div>
  );
}

export default App;
