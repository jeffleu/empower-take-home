// Constants
import { accountsTestData, trackerTestData } from "./test_data.ts";
import { categoryList } from './components/trackers/constants.ts';
// Types
import { Tracker } from "./types.ts";

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
  return sortTrackerData(trackerTestData);
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
