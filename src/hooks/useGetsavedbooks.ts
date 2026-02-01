import { useQuery } from "@tanstack/react-query";
import ApiClient1 from "../api-client";
import type Book1 from "../entities/Book";

const apiClient = new ApiClient1<Book1>("/user/book/saved-books");

const useGetsavedbooks = () =>{
  return useQuery<Book1[]>({
    queryKey: ['SavedBooks'],
    queryFn: () => apiClient.getAll(),
    enabled: !!localStorage.getItem('accessToken'),  // only run if token exists
    retry: false // do not retry on failure
  });
}
export default useGetsavedbooks;

