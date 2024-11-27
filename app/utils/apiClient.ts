'use server'

import {cookies} from 'next/headers';
import {AUTH_COOKIE} from '@/app/config/constants';
import {apiBaseUrl} from '@/app/config/endpoints';
import {constructQueryParams} from './queryParams';
import type {ApiOptions} from './types';

export const apiClient = async (endpoint: string, options: ApiOptions = {}) => {
  const query = constructQueryParams(options?.params ?? {});
  const awaitedCookies = await cookies();
  const jwt = awaitedCookies.get(AUTH_COOKIE)?.value;

  // Set up headers
  const headers = {
    ...(jwt && { Authorization: `Bearer ${jwt}` }),
    ...options.headers,
  };
  const isFormData = options?.body instanceof FormData;
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${apiBaseUrl}${endpoint}${query ? '?' + query : ''}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(`API call failed: ${res.status}`);
  }

  return await res.json();
};
