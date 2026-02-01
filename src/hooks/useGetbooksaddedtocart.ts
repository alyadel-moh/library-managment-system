import { useQuery } from "@tanstack/react-query";
import ApiClient1 from "../api-client";

interface cart {
    items: Array<Item>,
    totalCartPrice: string,
    totalItems: number
}
interface Item {
    isbn: string,
    title: string,
    unitPrice: number,
    quantity: number,
    subTotal: number
}

const apiClient = new ApiClient1<cart>("/user/cart");

const useGetaddedbookstocart = () =>{
  return useQuery<cart>({
    queryKey: ['userProfile'],
    queryFn: () => apiClient.getSingle(),
    enabled: !!localStorage.getItem('accessToken'),  // only run if token exists
    retry: false // do not retry on failure
  });
}
export default useGetaddedbookstocart;

