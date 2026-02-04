import { useQuery } from "@tanstack/react-query";
import ApiClient1 from "../api-client";

interface Top10sellingbooksResponse {
  isbn: string,
        category: string,
        title: string,
        total_sold: number
        url : string | null
}

const apiClient = new ApiClient1<Top10sellingbooksResponse>("/admin/reports/top-books");

const useGettop10sellingbooks = () =>{
  return useQuery<Top10sellingbooksResponse[]>({
    queryKey: ['top10sellingbooks'],
    queryFn: () => apiClient.getAll(),
    enabled: !!localStorage.getItem('accessToken'),  // only run if token exists
    retry: false // do not retry on failure
  });
}
export default useGettop10sellingbooks;