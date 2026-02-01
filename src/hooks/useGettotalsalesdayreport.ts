import { useQuery } from "@tanstack/react-query";
import ApiClient1 from "../api-client";

interface TotalsalesbydayreportResponse {
        on_day: string,
        total_sales: number
    }
    
const useGettotalsalesbydayreport = (date : string) =>{
  const apiClient = new ApiClient1<TotalsalesbydayreportResponse>(`/admin/reports/sales/by-day`);
  return useQuery<TotalsalesbydayreportResponse[]>({
    queryKey: ['totalsalesbydayreport', date],
    queryFn: () => apiClient.getArray(date),
    enabled: !!localStorage.getItem('accessToken') && !!date,  // only run if token exists and date is provided
    retry: false // do not retry on failure
  });
}
export default useGettotalsalesbydayreport;