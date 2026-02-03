import { useQuery } from "@tanstack/react-query";
import ApiClient1 from "../api-client";
import type Book1 from "../entities/Book";
import type { PageResponse } from "../entities/PageResponse";

export interface BookSearchCriteria {
  keyword?: string;       
  categoryId?: string;
  authorName?: string;
  publisherName?: string;
  minPrice?: string;
  maxPrice?: string;
  publicationYear?: string;
  isbn?: string;
}

const apiClient = new ApiClient1<PageResponse<Book1>>("/user/book/search");

const useGetBook = (criteria?: BookSearchCriteria, page: number = 0, size: number = 10) => {
  return useQuery<PageResponse<Book1>>({
    queryKey: ['books', criteria, page, size], // Add page & size to query key
    queryFn: () => apiClient.getAll({
      ...(criteria?.keyword && { keyword: criteria.keyword }),
      ...(criteria?.categoryId && { categoryId: criteria.categoryId }),
      ...(criteria?.authorName && { authorName: criteria.authorName }),
      ...(criteria?.publisherName && { publisherName: criteria.publisherName }),
      ...(criteria?.minPrice && { minPrice: criteria.minPrice }),
      ...(criteria?.maxPrice && { maxPrice: criteria.maxPrice }),
      ...(criteria?.publicationYear && { publicationYear: criteria.publicationYear }),
      ...(criteria?.isbn && { isbn: criteria.isbn }),
      page: page.toString(),
      size: size.toString(),
    }),
    enabled: !!criteria,
    retry: false
  });
}

export default useGetBook;