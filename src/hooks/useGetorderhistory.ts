import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
    }>
}
const useGetorderhistory = () =>{
  return useQuery<orderhistory []>({
    queryKey: ['orderHistory'],
    queryFn: () => {
        const token = localStorage.getItem('accessToken');
        return axios.get(
            "http://localhost:8080/api/user/history",
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then((response) => {
            console.log('Order history fetched successfully:', response.data);
            return response.data;
        });
    },
    enabled: !!localStorage.getItem('accessToken'),
    retry: false 
  });
}
export default useGetorderhistory;