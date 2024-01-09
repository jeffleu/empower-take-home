import React, {useEffect, useState} from 'react';
import { Box, LinearProgress } from '@mui/material';
// Components
import AddButton from '../common/AddButton.tsx';
import CategoryIcon from '../common/CategoryIcon.tsx';
import Row from '../common/Row.tsx';
// CSS
import './style.css';

const Trackers = () => {
  const [trackers, setTrackers] = useState(
    [
      {
        amount: 100,
        category: 'groceries',
        limit: 300,
        percentage: 33,
      },
      {
        amount: 250,
        category: 'education',
        limit: 1000,
        percentage: 25,
      },
      {
        amount: 500,
        category: 'shopping',
        limit: 1000,
        percentage: 50
      },
      {
        amount: 150,
        category: 'games',
        limit: 200,
        percentage: 75
      }
    ]
  );

  const menuItems = [
    {
      menuItemText: 'Create',
      onClick: () => {}
    },
    {
      menuItemText: 'Update',
      onClick: () => {}
    },
    {
      menuItemText: 'Remove',
      onClick: () => {}
    }
  ];

  useEffect(() => {

  }, []);

  return (
    <div className="trackers-wrapper">
      <div className="trackers-header">
        <div className="trackers-header-text">
          Trackers
        </div>

        <AddButton menuItems={menuItems}/>
      </div>

      <div className="trackers-list">
        {trackers.length ? (
          trackers.map(tracker => {
            return (
              <div key={tracker.category}>
                <Row
                  amount={tracker.amount}
                  amountSecondary={`of $${tracker.limit}`}
                  icon={<CategoryIcon category={tracker.category}/>}
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
    </div>  
  );
};

export default Trackers;
