import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
interface LoginResponse {
  status: string;
  message: string;
}
const useRemoveBookFromCart = (isbn : string) =>{
  return useMutation<LoginResponse, AxiosError<{message : string}>>({
    mutationFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.delete<LoginResponse>(
        `http://localhost:8080/api/user/cart/remove/${isbn}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ).then((response) => response.data);
    },
      onSuccess : (data: LoginResponse) => {
        console.log("Book removed successfully:", data);
      },
      onError :(error: AxiosError<{message : string}>) => {
        console.log("Error removing book:", error.response?.data?.message || error.message);
      }
  })
}
export default useRemoveBookFromCart;

