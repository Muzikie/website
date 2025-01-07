import {SamSite} from './types';

export const SPOTIFY_LINK_REG = /^https:\/\/open\.spotify\.com\/track\/[\w-]+/;

export const MUSIC_PLATFORMS = {
  APPLE: 'apple',
  SPOTIFY: 'spotify',
};
export const SPOTIFY_BASE = 'https://open.spotify.com/track/';

export const API_CALL_LIMIT = 10;

export const HTTP_STATUS = {
  OK: {CODE: 200, MESSAGE: 'OK'},
  CREATED: {CODE: 201, MESSAGE: 'Created'},
  NO_CONTENT: {CODE: 204, MESSAGE: 'No Content'},
  BAD_REQUEST: {CODE: 400, MESSAGE: 'Bad Request'},
  UNAUTHORIZED: {CODE: 401, MESSAGE: 'Unauthorized'},
  FORBIDDEN: {CODE: 403, MESSAGE: 'Forbidden'},
  NOT_FOUND: {CODE: 404, MESSAGE: 'Not Found'},
  NOT_SIGNED: {CODE: 405, MESSAGE: 'Not Signed'},
  INTERNAL_ERROR: {CODE: 500, MESSAGE: 'Internal Error'},
  PENDING: {CODE: 600, MESSAGE: 'Pending'},
};

export const USER_CREDENTIALS = 'user_session';
export const USER_PRESETS = 'user_presets';
export const AUTH_COOKIE = 'jwt';
export const LIVE_COOKIE = {
  maxAge: 60 * 60 * 24 * 7, 
  path: '/',
  httpOnly: false,
  secure: process.env.NEXT_PUBLIC_PROTOCOL === 'https',
  sameSite: 'lax' as unknown as SamSite,
  domain: process.env.NEXT_PUBLIC_BASE_URL?.replace(/:\d+$/, ''),
};
export const DEAD_COOKIE = {
  maxAge: -1,
  path: '/',
  secure: process.env.NEXT_PUBLIC_PROTOCOL === 'https',
  expires: new Date(0).getTime(),
  domain: process.env.NEXT_PUBLIC_BASE_URL?.replace(/:\d+$/, ''),
}

export const AUTH_PROVIDERS = [
  'google'
];
