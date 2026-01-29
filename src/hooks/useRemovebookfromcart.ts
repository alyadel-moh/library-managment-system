import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type BackendResponsemessage from "../entities/Response";
const useRemoveBookFromCart = (isbn : string) =>{
  return useMutation<BackendResponsemessage, AxiosError<{message : string}>>({
    mutationFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.delete<BackendResponsemessage>(
        `http://localhost:8080/api/user/cart/remove/${isbn}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ).then((response) => response.data);
    },
      onSuccess : (data: BackendResponsemessage) => {
        console.log("Book removed successfully:", data);
      },
      onError :(error: AxiosError<{message : string}>) => {
        console.log("Error removing book:", error.response?.data?.message || error.message);
      }
  })
}
export default useRemoveBookFromCart;

