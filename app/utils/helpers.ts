import {Buffer} from 'buffer';
import type {KeyValue} from '@/app/config/types';

export const truncateText = (text: string, length: number): string => {
  if (text.length > length) {
    return `${text.substring(0, length)}...`;
  }
  return text;
};

export const greet = (timestamp = 0) => {
  const date = timestamp ? new Date(timestamp) : new Date();
  const hour = date.getHours();
  if (hour < 12) {
    return 'Good morning';
  }
  if (hour < 17) {
    return 'Good afternoon';
  }
  return 'Good evening';
};

/**
 * Returns true if the value is null or undefined.
 *
 * @param {unknown} value
 * @returns {boolean}
 */
export const isNil = (value: unknown) => value === null || value === undefined;

/**
 * Returns true if the value is null, undefined, or an empty string, array or object.
 *
 * @param {unknown} value
 * @returns {boolean}
 */
export const isEmpty = (value: unknown) => {
  if (isNil(value)) {
    return true;
  }
  if (typeof value === 'string') {
    return value === '';
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  return false;
};

/*
 * @param {unknown} value
 * @returns {boolean}
 */
export const isNonEmptyBuffer = (value: unknown): boolean => {
  if (Buffer.isBuffer(value)) {
    return value.length > 0;
  }
  return false;
};

/**
 * Checks if a value is an object or array
 *
 * @param {unknown} value
 * @returns {boolean} True if the value is an object or array
 */
export const isObjectLiked = (value: unknown) =>
  Array.isArray(value) || typeof value === 'object';

/**
 * Creates a promise to wait for given time in seconds
 *
 * @param {number} seconds - Seconds to wait
 * @returns
 */
export const waitFor = (seconds: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });

export const removeNullValues = (obj: KeyValue): KeyValue => {
  const newObj: KeyValue = {};
  for (const key in obj) {
    if (obj[key] != null) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
};

export const bufferize = (value: string): Buffer => Buffer.from(value, 'hex');

export const calculateItemsToDisplay = (height: number): number =>
  Math.floor(height / 70);

export const mapAddressToNumber = (address: string = '') => {
  // Extract the last character of the wallet address and convert it to a number
  const lastCharacter = address.charAt(address.length - 1);
  return parseInt(lastCharacter, 36) % 10;
};
