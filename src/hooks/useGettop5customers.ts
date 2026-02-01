import { useQuery } from "@tanstack/react-query";
import ApiClient1 from "../api-client";

interface Top5customersResponse {
  last_name: string,
        total_spent: number,
        first_name: string,
        username: string
}

const apiClient = new ApiClient1<Top5customersResponse>("/admin/reports/top-customers");

const useGettop5customers = () =>{
  return useQuery<Top5customersResponse []>({
    queryKey: ['top5customers'],
    queryFn: () => apiClient.getAll(),
    enabled: !!localStorage.getItem('accessToken'),  // only run if token exists
    retry: false // do not retry on failure
  });
}
export default useGettop5customers;