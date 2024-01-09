import React from 'react';
// 3rd party libraries
import {
  GamepadOutlined,
  MonetizationOnOutlined,
  RestaurantOutlined,
  SchoolOutlined,
  ShoppingBagOutlined,
  ShoppingCartOutlined
} from '@mui/icons-material';
// CSS
import './style.css';

type PropsType = {
  category: string;
};

const CategoryIcon = ({category}: PropsType) => {
  let Icon = MonetizationOnOutlined;

  switch(category) {
    case 'education':
      Icon = SchoolOutlined;
      break;
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
    <div className={`category-icon icon-${category}`}>
      <Icon fontSize='large'/>
    </div>
  );
};

export default CategoryIcon;
