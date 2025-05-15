export const schema = {
  name: (value: unknown) => typeof value === 'string' && value.length > 3,
  description: (value: unknown) => typeof value === 'string' && value.length >= 140,
};
