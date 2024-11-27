import BigNumber from 'bignumber.js';

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

enum SupportedTokens {
  Sol = 'SOL',
  Usdc = 'USDC',
  Klayr = 'KLY',
}

const factors: Record<SupportedTokens, BigNumber> = {
  [SupportedTokens.Sol]: BigNumber(1e9),
  [SupportedTokens.Usdc]: BigNumber(1),
  [SupportedTokens.Klayr]: BigNumber(1e8),
};

export const fromBaseToken = (
  num: string | number,
  floatingPoints: number = 8,
  showSymbol?: boolean,
): string => {
  const token = process.env.NEXT_PUBLIC_TOKEN_SYMBOL as SupportedTokens;
  const formatted = BigNumber(num)
    .dividedBy(factors[token])
    .toFixed(floatingPoints);
  return showSymbol ? `${formatted} ${token}` : formatted;
};

export const toBaseToken = (num: string | number): string => {
  const token: SupportedTokens = process.env.NEXT_PUBLIC_TOKEN_SYMBOL;
  return BigNumber(num).multipliedBy(factors[token]).toFixed(0);
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
