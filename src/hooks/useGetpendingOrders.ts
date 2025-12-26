import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface order {
    orderId: number,
         publisherAddress: string,
        threshold: number,
        sellingPrice:number ,
        stockQuantity: number,
        title: number,
        status: string,
        orderDate:string,
        quantity: number,
        publisherName: string,
        isbn: string,
        totalOrderPrice: number
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