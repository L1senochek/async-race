export type Callback<T> = (data: T) => void;

export interface ElementParam {
  tag?: string;
  classNames: string[];
  innerText?: string;
  callback?: (event?: Event) => void;
  attributes?: {
    type: string;
    placeholder?: string;
  };
  href?: string;
  target?: string;
}
