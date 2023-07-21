// Variables
// const BASE = 'http://127.0.0.1:3000';
// export const GARAGE = `${BASE}/garage`;
// export const WINNERS = `${BASE}/winners`;
// export const ENGINE = `${BASE}/engine`;
// export const GARAGE_LIMIT = 7;
// export const WINNERS_LIMIT = 10;
export interface Item {
  name: string;
  color: string;
  id: number;
}

export type ItemsResponse = {
  items: Item[];
  count: string | null;
};

export type EngineResponse = {
  distance: number;
  velocity: number;
};

export enum Path {
  BASE = 'http://127.0.0.1:3000',
  GARAGE = `${BASE}/garage`,
  WINNERS = `${BASE}/winners`,
  ENGINE = `${BASE}/engine`,
}

export enum HeadersResponse {
  X_TOTAL_COUNT = 'X-Total-Count',
}

export interface EngineDriveModeResponse {
  success: true | false;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface Winners {
  count: string | null;
  data: Winner[];
}

export enum QueryParams {
  STATUS_STARTED = 'started',
  STATUS_STOPPED = 'stopped',
  STATUS_DRIVE = 'drive',
  GARAGE_LIMIT = 7,
  WINNERS_LIMIT = 10,
}

export interface Sort {
  sort: 'id' | 'wins' | 'time';
}

export interface Order {
  order: 'ASC' | 'DESC';
}

export enum HttpStatusCodes {
  CORS_PROBLEM = 0,
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  TIME_OUT = 504,
}

export enum HttpMetods {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
  CONNECT = 'CONNECT',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
}
