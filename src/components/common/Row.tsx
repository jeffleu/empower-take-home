import React from 'react';
// Utils
import { formatCurrency } from '../../utils.ts';
// CSS
import './style.css';

type PropsType = {
  amount: number;
  avatar?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  primaryText: string;
  secondaryText: string;
};

const Row = ({
  amount,
  avatar,
  icon,
  onClick,
  primaryText,
  secondaryText,
}: PropsType) => {
  return (
    <div className="row" onClick={onClick}>
      <div className="row-main">
        {icon ? icon : (
          <img className="row-image" src={avatar}/>
        )}

        <div className="row-name-wrapper">
          <div className="row-name-primary">
            {primaryText}
          </div>
          <div className="row-name-secondary">
            {secondaryText}
          </div>
        </div>
      </div>

      <div className="row-total">{formatCurrency(amount)}</div>
    </div>
  );
};

export default Row;
