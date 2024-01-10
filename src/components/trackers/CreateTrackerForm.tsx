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

const CreateTrackerForm = ({ onClose, open, setTrackers, trackers }: PropsType) => {
  const [category, setCategory] = useState<string>('');
  const [limit, setLimit] = useState<number>(0);
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const categoryMenuItems = getValidCategoryMenuItems(trackers);

  const onCreate = () => {
    const hasErrors = !category || !limit;
    setShowErrors(hasErrors);

    if (hasErrors) return;

    const tracker = {
      amount: 0, // TODO: Update this with transaction data
      category,
      limit,
      percentage: 0, // TODO: Calculate percentage by taking amount divide by limit
    };
    setTrackers(sortTrackerData([...trackers, tracker]));

    // Reset form state
    setCategory('');
    setLimit(0);

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create tracker</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: '32px' }}>
          Create a tracker to keep track of your spending for a particular category.
        </DialogContentText>

        <FormControl fullWidth error={!category && showErrors}>
          {/* Category select */}
          <InputLabel id="create-tracking-form-category-label">Category</InputLabel>
          <Select
            error={!category && showErrors}
            labelId="create-tracking-form-category-label"
            id="create-tracking-form-category-select"
            // @ts-expect-error
            value={category}
            label="Category"
            onChange={(event: SelectChangeEvent<HTMLInputElement>) => {
              setCategory(event.target.value as string);
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
          {!category && showErrors && (
            <FormHelperText sx={{ m: '-9px 0 0 1px' }}>Please select a category.</FormHelperText>
          )}
        </FormControl>

        {/* Max spending limit */}
        <TextField
          autoFocus
          error={showErrors && limit <= 0}
          fullWidth
          helperText={showErrors && limit <= 0 ? 'Please enter a valid amount.' : ''}
          id="create-tracking-form-spending-limit"
          label="Max spending limit"
          margin="dense"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setLimit(+event.target.value);
          }}
          type="number"
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onCreate}>Create</Button>
      </DialogActions>
    </Dialog >
  );
};

export default CreateTrackerForm;
