export type Callback<T> = (data: T) => void;

export interface ElementParam {
  tag?: string;
  classNames: string[];
  innerText?: string;
  callback?: Callback<Event> | null;
  attributes?: {
    type: string;
    placeholder: string;
  };
}
