import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
interface LoginResponse {
  status: string;
  message: string;
}
const useAddBooktocart = (isbn : string) =>{
  return useMutation<LoginResponse, AxiosError<{message : string}>>({
    mutationFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.post<LoginResponse>(
        `http://localhost:8080/api/user/cart/add/${isbn}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ).then((response) => response.data);
    },
      onSuccess : (data: LoginResponse) => {
        console.log("Book added to Cart successfully : ", data);
      },
      onError :(error: AxiosError<{message : string}>) => {
        console.log("Error adding book to Cart : ", error.response?.data?.message || error.message);
      }
  })
}
export default useAddBooktocart;