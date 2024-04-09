import currency from 'currency.js';

export const formatCurrency = (value: number | string): string => {
  return currency(value).format();
};
