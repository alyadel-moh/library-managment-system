import { useQuery } from "@tanstack/react-query";
import axios from "axios";      
interface TotalsalesbymonthreportResponse { 
  from_date: string,
        to_date: string,
        total_revenue: number
}
const useGettotalsalesbymonthreport = () =>{
  return useQuery<TotalsalesbymonthreportResponse []>({
    queryKey: ['totalsalesbymonthreport'],
    queryFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.get(
        "http://localhost:8080/api/admin/reports/sales/prev-month",
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ).then((response) => {
        console.log('Totalsalesbymonthreport fetched successfully:', response.data);
        return response.data;
      });
    },
    enabled: !!localStorage.getItem('accessToken'),  // only run if token exists
    retry: false // do not retry on failure
  });
}
export default useGettotalsalesbymonthreport;

