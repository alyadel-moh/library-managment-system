import { useQuery } from "@tanstack/react-query";
import ApiClient1 from "../api-client";

interface TotalsalesbymonthreportResponse { 
  from_date: string,
        to_date: string,
        total_revenue: number
}

const apiClient = new ApiClient1<TotalsalesbymonthreportResponse>("/admin/reports/sales/prev-month");

const useGettotalsalesbymonthreport = () =>{
  return useQuery<TotalsalesbymonthreportResponse []>({
    queryKey: ['totalsalesbymonthreport'],
    queryFn: () => apiClient.getAll(),
    enabled: !!localStorage.getItem('accessToken'),  // only run if token exists
    retry: false // do not retry on failure
  });
}
export default useGettotalsalesbymonthreport;

