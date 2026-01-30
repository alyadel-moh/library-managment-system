import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
const useGetBook = (criteria?: BookSearchCriteria) =>{
  return useQuery<Book1[]>({
    queryKey: ['books', criteria],
    queryFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.get(
        `http://localhost:8080/api/user/book/search?${new URLSearchParams({
          ...(criteria?.keyword && { keyword: criteria.keyword }),
          ...(criteria?.categoryId && { categoryId: criteria.categoryId }),
          ...(criteria?.authorName && { authorName: criteria.authorName }),
          ...(criteria?.publisherName && { publisherName: criteria.publisherName }),
          ...(criteria?.minPrice && { minPrice: criteria.minPrice }),
          ...(criteria?.maxPrice && { maxPrice: criteria.maxPrice }),
          ...(criteria?.publicationYear && { publicationYear: criteria.publicationYear }),
          ...(criteria?.isbn && { isbn: criteria.isbn }),
        })}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ).then((response) => {
        console.log('Book fetched successfully:', response.data);
        return response.data;
      });
    },
    enabled: !!criteria,  // only run if criteria is provided
    retry: false // do not retry on failure
  });
}
export default useGetBook;