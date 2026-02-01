import { useQuery } from "@tanstack/react-query";
import ApiClient1 from "../api-client";
import type Publisher from "../entities/Publisher";

const apiClient = new ApiClient1<Publisher>("/admin/publisher");

const useGetPublishers = () =>{
  return useQuery<Publisher[]>({
    queryKey: ['Publishers'],
    queryFn: () => apiClient.getAll(),
    enabled: !!localStorage.getItem('accessToken'),  // only run if token exists
    retry: false // do not retry on failure
  });
}
export default useGetPublishers;

