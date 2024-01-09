import React from 'react';
// 3rd party libraries
import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const AddButton = () => {
  return (
    <IconButton aria-label="add" size="large">
      <Add fontSize='large'/>
    </IconButton>
  );
};

export default AddButton;