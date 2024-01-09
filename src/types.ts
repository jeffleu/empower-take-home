export type AccountType = {
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
};
