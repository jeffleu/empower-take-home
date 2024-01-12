import React, { useEffect, useState } from 'react';
import { Box, LinearProgress } from '@mui/material';
// Components
import AddButton from '../common/AddButton.tsx';
import CategoryIcon from '../common/CategoryIcon.tsx';
import CreateTrackerForm from './CreateTrackerForm.tsx';
import Loading from '../common/Loading.tsx';
import RemoveTrackerForm from './RemoveTrackerForm.tsx';
import Row from '../common/Row.tsx';
import UpdateTrackerForm from './UpdateTrackerForm.tsx';
// CSS
import './style.css';
// Utils
import { getTrackerData, getValidCategoryMenuItems } from '../../utils.ts';
// Types
import { Tracker } from '../../types.ts';

const Trackers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openCreateForm, setOpenCreateForm] = useState<boolean>(false);
  const [openRemoveForm, setOpenRemoveForm] = useState<boolean>(false);
  const [openUpdateForm, setOpenUpdateForm] = useState<boolean>(false);
  const [spent, setSpent] = useState<Record<string, number>>({});
  const [trackers, setTrackers] = useState<Array<Tracker>>([]);
  const categoryMenuItems = getValidCategoryMenuItems(trackers);

  const menuItems: Array<{
    menuItemText: string;
    onClick: () => void;
  }> = [];

  if (categoryMenuItems.length) {
    menuItems.push({
      menuItemText: 'Create',
      onClick: () => { setOpenCreateForm(true) }
    });
  }

  if (trackers.length) {
    menuItems.push(
      {
        menuItemText: 'Update',
        onClick: () => { setOpenUpdateForm(true) }
      },
      {
        menuItemText: 'Remove',
        onClick: () => { setOpenRemoveForm(true) }
      }
    );
  }

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const { spent, trackerData } = getTrackerData();
      setTrackers(trackerData);
      setSpent(spent);
      setIsLoading(false);
    }, 1000);
  }, []);

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div className="trackers-wrapper">
      <div className="trackers-header">
        <div className="trackers-header-text">
          Trackers
        </div>

        <AddButton menuItems={menuItems} />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
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
      )}

      <CreateTrackerForm
        onClose={() => {
          setOpenCreateForm(false);
        }}
        open={openCreateForm}
        setTrackers={setTrackers}
        spent={spent}
        trackers={trackers}
      />

      <UpdateTrackerForm
        onClose={() => {
          setOpenUpdateForm(false);
        }}
        open={openUpdateForm}
        setTrackers={setTrackers}
        spent={spent}
        trackers={trackers}
      />

      <RemoveTrackerForm
        onClose={() => {
          setOpenRemoveForm(false);
        }}
        open={openRemoveForm}
        setTrackers={setTrackers}
        trackers={trackers}
      />
    </div>
  );
};

export default Trackers;
