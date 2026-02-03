import { useQuery } from "@tanstack/react-query";
import ApiClient1 from "../api-client";
import type Book1 from "../entities/Book";
import type { PageResponse } from "../entities/PageResponse";

const apiClient = new ApiClient1<PageResponse<Book1>>("/user/book/all");

const useGetbooks = (page: number = 0, size: number = 10) => {
  return useQuery<PageResponse<Book1>>({
    queryKey: ['books', 'all', page, size],
    queryFn: () => apiClient.getAll({
      page: page.toString(),
      size: size.toString(),
    }),
    enabled: true,
    retry: false
  });
}

export default useGetbooks;