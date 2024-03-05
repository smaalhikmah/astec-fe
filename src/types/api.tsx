export type ApiReturn<T> = {
  code: string;
  message: string;
  data: T;
};
