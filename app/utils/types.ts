import {FetchStatus} from '@/app/config/types';
import {StaticImageData} from 'next/image';

export type EndpointParams = Partial<
  Record<
    | 'offset'
    | 'limit'
    | 'sort'
    | 'audioID'
    | 'transactionID'
    | 'blockID'
    | 'creatorAddress'
    | 'awardedTo'
    | 'address'
    | 'winner',
    string | number
  >
>;

export interface MetaProps {
  total: number;
  offset: number;
  count: number;
}

export interface EndpointResult<T> {
  data: T;
  meta: MetaProps;
}

export type AwaitedEndpointResult<T> = Promise<EndpointResult<T>>;

export interface ErrorResponse {
  message: string;
  error: true;
}

export interface IncomingHttpHeaders {
  'Content-Type'?: string;
  'accept-patch'?: string;
  'accept-ranges'?: string;
  'www-authenticate'?: string;
  Authorization?: string;
  accept?: string;
  warning?: string;
  [header: string]: string | string[] | undefined;
}

interface KlayrSuccessResponse<T> {
  success: true;
  data: T;
}
interface KlayrFailureResponse {
  success: false;
  error: string;
}

export type KlayrResponse<T> = KlayrSuccessResponse<T> | KlayrFailureResponse;

export type StrapiResponse = {
  id: number;
  documentId: string;
  [key: string]: unknown;
};

export type FlattenedResponse = {
  id: number;
  [key: string]: unknown;
};

export interface Feedback {
  status: FetchStatus;
  message: string;
}

export interface FeedbackFnReturn {
  title: string;
  description: string;
  image?: string | StaticImageData;
}

export type MapObjectConfig<Input, Output> =
  | keyof Input
  | {from: keyof Input; to: keyof Output};

type ValidatorFunction = (value: unknown) => boolean;
export type ValidatorSchema = {
  [key: string]: ValidatorFunction | RegExp;
};

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export interface QueryParams {
  include?: Record<string, (string)[]>;
  filters?: Record<string, string|number|boolean>;
  pagination?: {
    page: number;
    pageSize?: number;
  };
}

export interface ApiOptions {
  headers?: IncomingHttpHeaders;
  params?: QueryParams;
  method?: 'POST'|'GET'|'DELETE'|'PUT';
  body?: string | FormData;
}
