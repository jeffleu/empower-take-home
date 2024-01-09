import React from 'react';
// 3rd party libraries
import {
  GamepadOutlined,
  MonetizationOnOutlined,
  RestaurantOutlined,
  ShoppingBagOutlined,
  ShoppingCartOutlined
} from '@mui/icons-material';
// CSS
import './style.css';

type PropsType = {
  category: string;
};

const TransactionIcon = ({category}: PropsType) => {
  let Icon = MonetizationOnOutlined;

  switch(category) {
    case 'games':
      Icon = GamepadOutlined;
      break;
    case 'groceries':
      Icon = ShoppingCartOutlined;
      break;
    case 'restaurant':
      Icon = RestaurantOutlined;
      break;
    case 'shopping':
      Icon = ShoppingBagOutlined;
      break;
    default:
      Icon = MonetizationOnOutlined;
  }

  return (
    <div className={`transaction-icon icon-${category}`}>
      <Icon fontSize='large'/>
    </div>
  );
};

export default TransactionIcon;
