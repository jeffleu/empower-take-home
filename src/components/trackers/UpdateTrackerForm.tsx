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

const UpdateTrackerForm = ({ onClose, open, setTrackers, trackers }: PropsType) => {
  const [category, setCategory] = useState<string>('');
  const [limit, setLimit] = useState<number>();
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const categoryMenuItems = trackers.map(tracker => tracker.category);

  const onUpdate = () => {
    const hasErrors = !category || !limit;
    setShowErrors(hasErrors);

    if (hasErrors) return;

    const filteredTrackers = trackers.filter(tracker => tracker.category !== category);
    const tracker = {
      amount: 0, // TODO: Update this with transaction data
      category,
      limit,
      percentage: 0, // TODO: Calculate percentage by taking amount divide by limit
    };
    setTrackers(sortTrackerData([...filteredTrackers, tracker]));

    // Reset form state
    setCategory('');
    setLimit(0);

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update tracker</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: '32px' }}>
          Select the category you would like to change the spending limit on.
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
              const selectedCategory = event.target.value as string;
              const previousLimit = trackers.find(tracker => tracker.category === selectedCategory)?.limit ?? 0;
              setCategory(selectedCategory);
              setLimit(previousLimit);
            }}
            sx={{ mb: '12px', textTransform: 'capitalize' }}
          >
            {categoryMenuItems.map(category => {
              return (
                <MenuItem
                  className="form-select-menu-item"
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
          error={showErrors && !limit}
          fullWidth
          helperText={showErrors && !limit ? 'Please enter a valid amount.' : ''}
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
        <Button onClick={() => {
          setCategory('');
          setLimit(0);
          onClose();
        }}>Cancel</Button>
        <Button onClick={onUpdate}>Update</Button>
      </DialogActions>
    </Dialog >
  );
};

export default UpdateTrackerForm;
