// Constants
import { accountsTestData, trackerTestData } from "./test_data.ts";
import { categoryList } from './components/trackers/constants.ts';
// Types
import { Tracker } from "./types.ts";

export const calcAmountSpent = (accounts) => {
  const spent = {};

  accounts.forEach(account => {
    const { transactions } = account;
    transactions.forEach(transaction => {
      if (!spent.hasOwnProperty(transaction.category)) spent[transaction.category] = 0;
      spent[transaction.category] += transaction.amount;
    });
  });

  return spent;
};

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

export const formatDate = (date: string) => {
  const dateObject = new Date(date);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(dateObject);
  const day = dateObject.getDate();
  return `${month} ${day}`;
};

export const getAccountData = () => {
  return accountsTestData;
};

export const getTrackerData = () => {
  const spent = calcAmountSpent(accountsTestData.accounts);
  const trackerData = sortTrackerData(trackerTestData);
  // Update tracker data with proper amount and percentage based on accounts data
  trackerData.forEach(tracker => {
    if (spent.hasOwnProperty(tracker.category)) {
      tracker.amount = spent[tracker.category];
      tracker.percentage = (spent[tracker.category] / tracker.limit) * 100;
    }
  });
  return { spent, trackerData };
};

export const getValidCategoryMenuItems = (trackers: Array<Tracker>): Array<string> => {
  const existingTrackers = new Set(
    trackers.map(tracker => tracker.category)
  );
  return categoryList.filter(category => !existingTrackers.has(category));
};

export const sortTrackerData = (trackerData: Array<Tracker>): Array<Tracker> => {
  return trackerData.sort((a, b) => {
    if (a.category > b.category) return 1;
    else if (a.category < b.category) return -1;
    return 0;
  });
};
