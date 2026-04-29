export interface IPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export type HeadlessCMSResponse<T> = {
  data: T;
  meta: {
    pagination: IPagination;
  };
};
