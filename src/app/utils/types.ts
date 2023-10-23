export type ResponseData = {
  error: null | Error;
  data: {
    id: string;
    created_at: string;
    puzzle: string;
  }[];
  count: null | number;
  status: number;
  statusText: string;
};
