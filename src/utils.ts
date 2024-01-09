import { accountsTestData } from "./test_data.ts";

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
