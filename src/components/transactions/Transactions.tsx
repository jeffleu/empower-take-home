import React, {useEffect, useState} from 'react';
// Components
import AddButton from '../common/AddButton.tsx';
import Loading from '../common/Loading.tsx';
// Utils
import { formatCurrency, getAccountData } from '../../utils.ts';
// Constants
import type { AccountType } from '../../types.ts';
// CSS
import './style.css';

const Accounts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState();

  // Retrieve data on mount
  useEffect(() => {
    setIsLoading(true);
    // setTimeout used here to mock API call
    setTimeout(() => {
      const {transactions} = getTransactionsData();
      // setTransactions();
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="accounts-wrapper">
      <div className="accounts-header">
        <div className="account-header-text">
          Transactions
        </div>
      </div>

      <div className="transaction-list">
        
      </div>
    </div>  
  );
};

export default Accounts;
