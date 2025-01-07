'use server';

import {klayrBaseUrl} from '@/app/config/endpoints';
import {KlayrResponse} from './types';

export const klayrClient = async <T>(
  method: string,
  params: Record<string, unknown>,
): Promise<KlayrResponse<T>> => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(klayrBaseUrl);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method,
          params,
        }),
      );
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        resolve({
          success: true,
          data: data.result,
        });
      } catch (err) {
        reject({
          success: false,
          error: 'Failed to parse response',
        });
      } finally {
        ws.close();
      }
    };

    ws.onerror = (err) => {
      reject({
        success: false,
        error: 'WebSocket error',
      });
      ws.close();
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
  });
};
