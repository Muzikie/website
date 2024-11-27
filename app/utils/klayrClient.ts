'use server';

import {klayrBaseUrl} from '@/app/config/endpoints';

export const klayrClient = async (
  method: string,
  params: Record<string, unknown>,
) => {
  const res = await fetch(`${klayrBaseUrl}/rpc`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method,
      params,
    }),
  });

  if (!res.ok) {
    throw new Error(`API call failed: ${res.status}`);
  }

  return await res.json();
};
