export enum Path {
  BASE = 'http://127.0.0.1:3000',
  GARAGE = `${BASE}/garage`,
  WINNERS = `${BASE}/winners`,
  ENGINE = `${BASE}/engine`,
}

export interface CreateItem {
  name: string;
  color: string;
}

export interface Item extends CreateItem {
  id: number;
}

export type ItemsResponse = {
  items: Item[];
  count: string | null;
};

export enum HeadersResponse {
  X_TOTAL_COUNT = 'X-Total-Count',
}

export type EngineResponse = {
  distance: number;
  velocity: number;
};

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

export enum QueryParamLimits {
  GARAGE_LIMIT = 7,
  WINNERS_LIMIT = 10,
}

export enum StatusEngineParam {
  STATUS_STARTED = 'started',
  STATUS_STOPPED = 'stopped',
  STATUS_DRIVE = 'drive',
}

export enum Sort {
  ID = 'id',
  WINS = 'wins',
  TIME = 'time',
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
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
