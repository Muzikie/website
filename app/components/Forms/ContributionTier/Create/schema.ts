export const schema = {
  name: (value: unknown) => typeof value === 'string' && value.length > 3,
  description: (value: unknown) =>
    typeof value === 'string' && value.length >= 10 && value.length < 100,
  rewards: (value: unknown) => typeof value === 'string' && value.length >= 140,
  amount: (value: unknown) => {
    const parsedValue = parseFloat(value);
    return !isNaN(parsedValue) && isFinite(parsedValue);
  },
};
