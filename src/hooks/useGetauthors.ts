import { useQuery } from "@tanstack/react-query";
import ApiClient1 from "../api-client";
import type Author from "../entities/Author";

const apiClient = new ApiClient1<Author>("/admin/author");

const useGetAuthors = () =>{
  return useQuery<Author[]>({
    queryKey: ['authors'],
    queryFn: () => apiClient.getAll(),
    enabled: !!localStorage.getItem('accessToken'),  // only run if token exists
    retry: false // do not retry on failure
  });
}
export default useGetAuthors;
