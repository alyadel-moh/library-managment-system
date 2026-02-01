import { useQuery } from "@tanstack/react-query";
import ApiClient1 from "../api-client";
import type Book1 from "../entities/Book";

const apiClient = new ApiClient1<Book1>("/user/book/all");

const useGetbooks = () => {
  return useQuery<Book1[]>({
    queryKey: ['books'],
    queryFn: () => apiClient.getAll(),
    enabled: true,  // always run
    retry: false // do not retry on failure
  });
}

export default useGetbooks;
