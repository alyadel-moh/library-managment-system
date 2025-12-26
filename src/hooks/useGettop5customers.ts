import { useQuery } from "@tanstack/react-query";
import axios from "axios";      
interface Top5customersResponse {
  last_name: string,
        total_spent: number,
        first_name: string,
        username: string
}
const useGettop5customers = () =>{
  return useQuery<Top5customersResponse []>({
    queryKey: ['top5customers'],
    queryFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.get(
        "http://localhost:8080/api/admin/reports/top-customers",
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ).then((response) => {
        console.log('Top5customers fetched successfully:', response.data);
        return response.data;
      });
    },
    enabled: !!localStorage.getItem('accessToken'),  // only run if token exists
    retry: false // do not retry on failure
  });
}
export default useGettop5customers;