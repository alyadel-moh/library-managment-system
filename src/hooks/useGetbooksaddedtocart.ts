import { useQuery } from "@tanstack/react-query";
import axios from "axios";      

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
const useGetaddedbookstocart = () =>{
  return useQuery<cart>({
    queryKey: ['userProfile'],
    queryFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.get(
        "http://localhost:8080/api/user/cart",
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ).then((response) => {
        console.log('Books added to cart fetched successfully:', response.data);
        return response.data;
      });
    },
    enabled: !!localStorage.getItem('accessToken'),  // only run if token exists
    retry: false // do not retry on failure
  });
}
export default useGetaddedbookstocart;

