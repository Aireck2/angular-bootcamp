export interface PageInfo {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  perPage: number;
  total: number;
}

export const DEFAULT_PAGE_INFO: PageInfo = {
  currentPage: 1,
  hasNextPage: false,
  hasPreviousPage: false,
  perPage: 10,
  total: 0,
};
