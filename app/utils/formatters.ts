import BigNumber from 'bignumber.js';
import {SupportedTokens, Balance} from '@/app/config/types';
import {tokenConversionFactors} from '@/app/config/constants';

export const formatBalances = (balances: Balance[]): string[] => {
  if (!balances.length) {
    return [fromBaseToken('0', 4)];
  }

  return balances.map(({availableBalance}) => fromBaseToken(availableBalance, 4));
}


export const formatThousands = (num: number): string => {
  const si = [
    {value: 1e18, sign: 'E'},
    {value: 1e15, sign: 'P'},
    {value: 1e12, sign: 'T'},
    {value: 1e9, sign: 'B'},
    {value: 1e6, sign: 'M'},
    {value: 1e3, sign: 'K'},
  ];

  const signItem = si.find(item => num >= item.value);
  return !signItem
    ? num.toString()
    : (num / signItem.value)
        .toFixed(2)
        .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + signItem.sign;
};

export const getYear = (num: number): string => {
  const year = new Date(num * 1000).getFullYear();
  return year.toString();
};

export const fromBaseToken = (
  num: string | number = '0',
  floatingPoints: number = 8,
  token: SupportedTokens = SupportedTokens.LSK,
): string => {
  const formatted = BigNumber(num)
    .dividedBy(tokenConversionFactors[token])
    .toFixed(floatingPoints);
  return token ? `${formatted} ${token}` : formatted;
};

export const toBaseToken = (num: string | number): string => {
  const token = process.env.NEXT_PUBLIC_TOKEN_SYMBOL as SupportedTokens;
  return BigNumber(num).multipliedBy(tokenConversionFactors[token]).toFixed(0);
};

export const truncateAddress = (address: string): string => {
  return address.replace(/^(.{6})(.+)?(.{5})$/, '$1...$3');
};

export const CapitalizeKey = (key: string = ''): string =>
  key
    .split('_')
    .map((word, index) => {
      const capitalizedWord =
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      return index === 0 ? capitalizedWord : word.toLowerCase(); // Handle first word separately
    })
    .join(' ');
