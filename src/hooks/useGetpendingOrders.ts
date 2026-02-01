import { useQuery } from "@tanstack/react-query";
import ApiClient1 from "../api-client";

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

const apiClient = new ApiClient1<order>("/admin/order/pending");

const useGetpendingOrders = () =>{
  return useQuery<order[]>({
    queryKey: ['pendingOrders'],
    queryFn: () => apiClient.getAll(),
    enabled: !!localStorage.getItem('accessToken'),
    retry: false 
  });
}
export default useGetpendingOrders;