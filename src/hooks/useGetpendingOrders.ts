import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface order {
    order_id: number,
        order_date:  string,
        order_status: string,
        order_quantity: number,
        book_price: number,
        total_order_price: number,
        publisher_name: string,
        publisher_address: string,
        book_isbn: string,
        book_title: string,
        book_current_stock: number,
        book_stock_threshold: number
}
const useGetpendingOrders = () =>{
  return useQuery<order[]>({
    queryKey: ['pendingOrders'],
    queryFn: () => {
        const token = localStorage.getItem('accessToken');
        return axios.get(
            "http://localhost:8080/api/admin/order/pending",
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then((response) => {
            console.log('Pending orders fetched successfully:', response.data);
            return response.data;
        });
    },
    enabled: !!localStorage.getItem('accessToken'),
    retry: false 
  });
}
export default useGetpendingOrders;