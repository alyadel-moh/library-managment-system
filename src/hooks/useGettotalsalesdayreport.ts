import { useQuery } from "@tanstack/react-query";
import axios from "axios";      
interface TotalsalesbydayreportResponse {
        on_day: string,
        total_sales: number
    }
const useGettotalsalesbydayreport = (date : string) =>{
  return useQuery<TotalsalesbydayreportResponse[]>({
    queryKey: ['totalsalesbydayreport', date],
    queryFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.get(
        `http://localhost:8080/api/admin/reports/sales/by-day/${date}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ).then((response) => {
        console.log('Totalsalesbydayreport fetched successfully:', response.data);
        return response.data;
      });
    },
    enabled: !!localStorage.getItem('accessToken') && !!date,  // only run if token exists and date is provided
    retry: false // do not retry on failure
  });
}
export default useGettotalsalesbydayreport;