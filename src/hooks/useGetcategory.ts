import { useQuery } from "@tanstack/react-query";
import ApiClient1 from "../api-client";
import type Category from "../entities/Category";

const apiClient = new ApiClient1<Category>("/admin/category");

const useGetCategories = () =>{
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => apiClient.getAll(),
    enabled: !!localStorage.getItem('accessToken'),  // only run if token exists
    retry: false // do not retry on failure
  });
}
export default useGetCategories;
