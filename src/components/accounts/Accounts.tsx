import React, {useEffect, useState} from 'react';
// Components
import AddButton from '../common/AddButton.tsx';
import Loading from '../common/Loading.tsx';
import Row from '../common/Row.tsx';
// Utils
import { formatCurrency, getAccountData } from '../../utils.ts';
// Constants
import type { Account, Transaction } from '../../types.ts';
// CSS
import './style.css';

const Accounts = () => {
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showTransactions, setShowTransactions] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);

  // Retrieve data on mount
  useEffect(() => {
    setIsLoading(true);
    // setTimeout used here to mock API call
    setTimeout(() => {
      const {total, accounts} = getAccountData();
      setTotal(total);
      setAccounts(accounts);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div className="accounts-wrapper">
      <div className="accounts-header">
        <div className="account-header-text">
          All accounts
        </div>

        <AddButton/>
      </div>

      <div className="accounts-total">Total: {formatCurrency(total)}</div>

      <div className="accounts-list">
        {accounts.map(account => {
          return (
            <Row
              amount={account.balances.current || 0}
              avatar={account.image_url}
              onClick={() => {
                setTransactions(account.transactions);
                setShowTransactions(true);
              }}
              primaryText={account.name}
              secondaryText={account.official_name}
            />
          );
        })}
      </div>
    </div>  
  );
};

export default Accounts;
