import { useQuery } from "@tanstack/react-query";
import ApiClient1 from "../api-client";

interface orderhistory {
    orderId : number,
    totalPrice : number,
    orderDate : string,
    items : Array<{
        isbn : string,
        title : string,
        unit_price : number,
        quantity : number,
        total_price_book : number
        url : string | null
    }>
}

const apiClient = new ApiClient1<orderhistory>("/user/history");

const useGetorderhistory = () =>{
  return useQuery<orderhistory []>({
    queryKey: ['orderHistory'],
    queryFn: () => apiClient.getAll(),
    enabled: !!localStorage.getItem('accessToken'),
    retry: false 
  });
}
export default useGetorderhistory;