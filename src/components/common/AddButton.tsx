import React from 'react';
// 3rd party libraries
import { Add } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';

type MenuItem = {
  menuItemText: string;
  onClick: () => void;
}

type PropsType = {
  menuItems: Array<MenuItem>;
}

const AddButton = ({menuItems}: PropsType) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-label="add" onClick={handleClick} size="large">
        <Add fontSize='large'/>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuItems.map(menuItem => {
          return (
            <MenuItem key={menuItem.menuItemText} onClick={() => {
              menuItem.onClick();
              handleClose();
            }}>
              <div className="menu-item">{menuItem.menuItemText}</div>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default AddButton;