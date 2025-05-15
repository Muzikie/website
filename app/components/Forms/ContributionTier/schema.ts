export const schema = {
  name: (value: unknown) => typeof value === 'string' && value.length > 3,
  rewards: (value: unknown) => typeof value === 'string' && value.length >= 140,
  amount: (value: unknown) => {
    const parsedValue = parseFloat(value as string);
    return !isNaN(parsedValue) && isFinite(parsedValue);
  },
};
