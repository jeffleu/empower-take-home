export type Account = {
  account_id: string;
  balances: {
    available: number;
    current: number;
    iso_currency_code: string;
  },
  image_url: string;
  name: string;
  official_name: string;
  subtype: string;
  transactions: Array<Transaction>;
};

export type Tracker = {
  amount: number;
  category: string;
  limit: number;
  percentage: number;
}

export type Transaction = {
  amount: number;
  category: string;
  date: string;
  datetime: string;
  id: string;
  iso_currency_code: string;
  merchant_name: string;
  name: string;
  pending: boolean;
};
