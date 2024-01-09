import { accountsTestData } from "./test_data.ts";

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

export const getAccountData = () => {
  return accountsTestData;
};
