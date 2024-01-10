import React, { useState } from 'react';
// 3rd party libraries
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
// Utils
import { getValidCategoryMenuItems, sortTrackerData } from '../../utils.ts';
// Types
import { Tracker } from '../../types.ts';

type PropsType = {
  onClose: () => void;
  open: boolean;
  setTrackers: (trackers: Array<Tracker>) => void;
  trackers: Array<Tracker>;
}

const RemoveTrackerForm = ({ onClose, open, setTrackers, trackers }: PropsType) => {
  const [categoryToRemove, setCategoryToRemove] = useState<string>('');
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const categoryMenuItems = trackers.map(tracker => tracker.category);

  const onRemove = () => {
    const hasErrors = !categoryToRemove;
    setShowErrors(hasErrors);
    if (hasErrors) return;

    // Update tracker list state, removing category selected
    const updatedTrackerList = trackers.filter(tracker => {
      return tracker.category !== categoryToRemove;
    });
    setTrackers(updatedTrackerList);

    // Reset state
    setCategoryToRemove('');

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Remove tracker</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: '32px' }}>
          Remove a spending limit tracker.
        </DialogContentText>

        <FormControl fullWidth error={!categoryToRemove && showErrors}>
          {/* Category select */}
          <InputLabel id="create-tracking-form-category-label">Category</InputLabel>
          <Select
            error={!categoryToRemove && showErrors}
            labelId="create-tracking-form-category-label"
            id="create-tracking-form-category-select"
            // @ts-expect-error
            value={categoryToRemove}
            label="Category"
            onChange={(event: SelectChangeEvent<HTMLInputElement>) => {
              setCategoryToRemove(event.target.value as string);
            }}
            sx={{ mb: '12px', textTransform: 'capitalize' }}
          >
            {categoryMenuItems.map(category => {
              return (
                <MenuItem
                  className="create-tracking-form-select-menu-item"
                  key={category}
                  value={category}
                >
                  {category}
                </MenuItem>
              );
            })}
          </Select>
          {!categoryToRemove && showErrors && (
            <FormHelperText sx={{ m: '-9px 0 0 1px' }}>Please select a category.</FormHelperText>
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          setCategoryToRemove('');
          onClose();
        }}>Cancel</Button>
        <Button onClick={onRemove}>Remove</Button>
      </DialogActions>
    </Dialog >
  );
};

export default RemoveTrackerForm;
