export interface ICriteria {
  [key: string]: any;
}

interface IPagination {
  page: number;
  perPage: number;
}

export type FilterProps = {
  criteria?: ICriteria;
  pagination?: IPagination;
};
