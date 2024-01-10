import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  TextField
} from '@mui/material';
// Components
import AddButton from '../common/AddButton.tsx';
import CategoryIcon from '../common/CategoryIcon.tsx';
import CreateTrackerForm from './CreateTrackerForm.tsx';
import Loading from '../common/Loading.tsx';
import Row from '../common/Row.tsx';
// CSS
import './style.css';
// Utils
import { getTrackerData, getValidCategoryMenuItems, sortTrackerData } from '../../utils.ts';
// Types
import { Tracker } from '../../types.ts';

const Trackers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openCreateForm, setOpenCreateForm] = useState<boolean>(false);
  const [trackers, setTrackers] = useState<Array<Tracker>>([]);
  const categoryMenuItems = getValidCategoryMenuItems(trackers);

  const menuItems = [
    {
      menuItemText: 'Update',
      onClick: () => { }
    },
    {
      menuItemText: 'Remove',
      onClick: () => { }
    }
  ];

  if (categoryMenuItems.length) {
    menuItems.unshift({
      menuItemText: 'Create',
      onClick: () => { setOpenCreateForm(true) }
    });
  }

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const trackersData = getTrackerData();
      setTrackers(trackersData);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="trackers-wrapper">
      <div className="trackers-header">
        <div className="trackers-header-text">
          Trackers
        </div>

        <AddButton menuItems={menuItems} />
      </div>

      <div className="trackers-list">
        {trackers.length ? (
          trackers.map(tracker => {
            return (
              <div key={tracker.category}>
                <Row
                  amount={tracker.amount}
                  amountSecondary={`of $${tracker.limit}`}
                  icon={<CategoryIcon category={tracker.category} />}
                  primaryText={tracker.category}
                  secondaryText={`${tracker.percentage}%`}
                />
                <Box sx={{ mt: '-12px', width: '100%' }}>
                  <LinearProgress className="progress-bar" variant="determinate" value={tracker.percentage} />
                </Box>
              </div>
            );
          })
        ) : (
          <div>No trackers</div>
        )}
      </div>

      <CreateTrackerForm
        onClose={() => {
          setOpenCreateForm(false);
        }}
        open={openCreateForm}
        setTrackers={setTrackers}
        trackers={trackers}
      />
    </div>
  );
};

export default Trackers;
