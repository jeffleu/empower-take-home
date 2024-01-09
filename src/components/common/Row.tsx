import React from 'react';
// Utils
import { formatCurrency } from '../../utils.ts';

type PropsType = {
  amount: number;
  avatar: string | null;
  onClick: () => void;
  primaryText: string;
  secondaryText: string;
};

const Row = ({
  amount,
  avatar,
  onClick,
  primaryText,
  secondaryText,
}: PropsType) => {
  return (
    <div className="accounts-row" onClick={onClick}>
      <div className="accounts-row-main">
        <img className="accounts-row-image" src={avatar || ''}/>

        <div className="accounts-row-name-wrapper">
          <div className="accounts-row-name-primary">
            {primaryText}
          </div>
          <div className="accounts-row-name-secondary">
            {secondaryText}
          </div>
        </div>
      </div>

      <div className="accounts-row-total">{formatCurrency(amount)}</div>
    </div>
  );
};

export default Row;
