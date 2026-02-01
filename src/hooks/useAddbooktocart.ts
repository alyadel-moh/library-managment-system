import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ApiClient1 from "../api-client";
import type BackendResponse from "../entities/Response";

const useAddBooktocart = (isbn : string) =>{
  const apiClient = new ApiClient1<BackendResponse>("/user/cart/add");
  return useMutation<BackendResponse, AxiosError<{message : string}>>({
    mutationFn: () => apiClient.post({}, isbn),
      onSuccess : (data: BackendResponse) => {
        console.log("Book added to Cart successfully : ", data);
      },
      onError :(error: AxiosError<{message : string}>) => {
        console.log("Error adding book to Cart : ", error.response?.data?.message || error.message);
      }
  })
}
export default useAddBooktocart;