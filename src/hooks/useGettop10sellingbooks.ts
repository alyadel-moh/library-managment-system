import { useQuery } from "@tanstack/react-query";
import axios from "axios";      
interface Top10sellingbooksResponse {
  isbn: string,
        category: string,
        title: string,
        total_sold: number
}
const useGettop10sellingbooks = () =>{
  return useQuery<Top10sellingbooksResponse[]>({
    queryKey: ['top10sellingbooks'],
    queryFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.get(
        "http://localhost:8080/api/admin/reports/top-books",
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ).then((response) => {
        console.log('Top10sellingbooksts fetched successfully:', response.data);
        return response.data;
      });
    },
    enabled: !!localStorage.getItem('accessToken'),  // only run if token exists
    retry: false // do not retry on failure
  });
}
export default useGettop10sellingbooks;