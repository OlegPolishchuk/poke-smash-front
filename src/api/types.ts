export interface PaginatedParams {
  limit?: number;
  offset?: number;
}

export interface PaginatedList<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
