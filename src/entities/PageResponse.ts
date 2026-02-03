export interface PageResponse<T> {
  content: T[];
  number: number;        // current page number (0-indexed)
  size: number;          // page size
  totalElements: number; // total number of items
  totalPages: number;    // total number of pages
  first: boolean;        // is first page
  last: boolean;         // is last page
  empty: boolean;        // is page empty
}