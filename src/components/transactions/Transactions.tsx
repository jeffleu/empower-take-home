import React from 'react';
// 3rd party libraries
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
// Components
import Row from '../common/Row.tsx';
import TransactionIcon from './TransactionIcon.tsx';
// Utils
import { formatCurrency, formatDate } from '../../utils.ts';
// Types
import type { Account, Transaction } from '../../types.ts';

type PropsType = {
  account: Account;
  onClose: () => void;
}

const Transactions = ({account, onClose}: PropsType) => {
  return (
    <div className="transactions-wrapper">
      <div className="transactions-header">
        <div className="transactions-header-text">
          Transactions
        </div>

        <IconButton aria-label="close" onClick={onClose} size="large">
          <Close fontSize="large"/>
        </IconButton>
      </div>

      <div className="transaction-account-name">{account.official_name}</div>

      <div className="transaction-list">
        {account.transactions.length ? (
          account.transactions.map(transaction => {
            return (
              <Row
                amount={transaction.amount}
                icon={<TransactionIcon category={transaction.category}/>}
                primaryText={transaction.merchant_name}
                secondaryText={`${formatDate(transaction.date)}${transaction.pending ? ' • Pending' : ''}`}
              />
            );
          })
        ) : (
          <div>No transaction history.</div>
        )}
      </div>
    </div>  
  );
};

export default Transactions;
