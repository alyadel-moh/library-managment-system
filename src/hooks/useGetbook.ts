import { useQuery } from "@tanstack/react-query";
import ApiClient1 from "../api-client";
import type Book1 from "../entities/Book";

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

const apiClient = new ApiClient1<Book1>("/user/book/search");

const useGetBook = (criteria?: BookSearchCriteria) =>{
  return useQuery<Book1[]>({
    queryKey: ['books', criteria],
    queryFn: () => apiClient.getAll({
      ...(criteria?.keyword && { keyword: criteria.keyword }),
      ...(criteria?.categoryId && { categoryId: criteria.categoryId }),
      ...(criteria?.authorName && { authorName: criteria.authorName }),
      ...(criteria?.publisherName && { publisherName: criteria.publisherName }),
      ...(criteria?.minPrice && { minPrice: criteria.minPrice }),
      ...(criteria?.maxPrice && { maxPrice: criteria.maxPrice }),
      ...(criteria?.publicationYear && { publicationYear: criteria.publicationYear }),
      ...(criteria?.isbn && { isbn: criteria.isbn }),
    }),
    enabled: !!criteria,  // only run if criteria is provided
    retry: false // do not retry on failure
  });
}
export default useGetBook;