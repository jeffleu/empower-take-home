import React, {useEffect, useState} from 'react';
// Components
import AddButton from '../common/AddButton.tsx';
import Loading from '../common/Loading.tsx';
import Row from '../common/Row.tsx';
import Transactions from '../transactions/Transactions.tsx';
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
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null);

  const menuItems = [
    {
      menuItemText: 'Add account',
      onClick: () => {}
    },
    {
      menuItemText: 'Remove account',
      onClick: () => {}
    }
  ];

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

  if (showTransactions && currentAccount) {
    return (
      <Transactions
        onClose={() => {setShowTransactions(false)}}
        account={currentAccount}
      />);
  }

  return (
    <div className="accounts-wrapper">
      <div className="accounts-header">
        <div className="accounts-header-text">
          All accounts
        </div>

        <AddButton menuItems={menuItems}/>
      </div>

      <div className="accounts-total">Total: {formatCurrency(total)}</div>

      <div className="accounts-list">
        {accounts.map(account => {
          return (
            <Row
              amount={account.balances.current || 0}
              avatar={account.image_url}
              key={account.account_id}
              onClick={() => {
                setCurrentAccount(account);
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
