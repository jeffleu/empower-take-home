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
  const [total, setTotal] = useState<number>(0);
  const [accounts, setAccounts] = useState<Array<AccountType>>([]);

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
    return (
      <Loading/>
    );
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
            <div className="accounts-row">
              <div className="accounts-row-main">
                <img className="accounts-row-image" src={account.image_url}/>

                <div className="accounts-row-name-wrapper">
                  <div className="accounts-row-name-primary">
                    {account.name}
                  </div>
                  <div className="accounts-row-name-secondary">
                    {account.official_name}
                  </div>
                </div>
              </div>

              <div className="accounts-row-total">{formatCurrency(account.balances?.current || 0)}</div>
            </div>
          );
        })}
      </div>
    </div>  
  );
};

export default Accounts;
