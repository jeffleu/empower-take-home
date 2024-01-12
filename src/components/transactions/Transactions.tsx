import React from 'react';
// 3rd party libraries
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
// Components
import CategoryIcon from '../common/CategoryIcon.tsx';
import Row from '../common/Row.tsx';
// Utils
import { formatCurrency, formatDate } from '../../utils.ts';
// Types
import type { Account, Transaction } from '../../types.ts';
// CSS
import './style.css';

type PropsType = {
  account: Account;
  onClose: () => void;
}

const Transactions = ({ account, onClose }: PropsType) => {
  return (
    <div className="transactions-wrapper">
      <div className="transactions-header">
        <div className="transactions-header-text">
          Transactions
        </div>

        <IconButton aria-label="close" onClick={onClose} size="large">
          <Close fontSize="large" />
        </IconButton>
      </div>

      <div className="transactions-account-name">{account.official_name}</div>

      <div className="transactions-list">
        {account.transactions.length ? (
          account.transactions.map(transaction => {
            return (
              <Row
                amount={transaction.amount}
                icon={<CategoryIcon category={transaction.category} />}
                key={transaction.id}
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
