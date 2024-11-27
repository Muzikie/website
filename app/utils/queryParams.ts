import type {QueryParams} from './types';

export const constructQueryParams = (params: QueryParams) => {
  const queryParams: Record<string, string | number | boolean> = {};

  // Flattening include params for population
  if (params.include) {
    Object.entries(params.include).forEach(([key, value]) => {
      value.forEach((field: string) => {
        if (field === '*') {
          queryParams[`populate[${key}][populate]`] = '*';
        } else {
          const index = value.indexOf(field);
          queryParams[`populate[${key}][fields][${index}]`] = field;
        }
      });
    });
  }

  // Handling filters
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      queryParams[`filters[${key}]`] = value;
    });
  }

  // Handling pagination
  if (params.pagination) {
    Object.entries(params.pagination).forEach(([key, value]) => {
      queryParams[`pagination[${key}]`] = value;
    });
  }

  // Converting queryParams object to a query string
  const query = Object.keys(queryParams)
    .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
    .join('&');

  return query;
};