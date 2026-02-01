import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ApiClient1 from "../api-client";
import type BackendResponsemessage from "../entities/Response";

const useRemoveBookFromCart = (isbn : string) =>{
  const apiClient = new ApiClient1<BackendResponsemessage>("/user/cart/remove");
  return useMutation<BackendResponsemessage, AxiosError<{message : string}>>({
    mutationFn: () => apiClient.delete(isbn),
      onSuccess : (data: BackendResponsemessage) => {
        console.log("Book removed successfully:", data);
      },
      onError :(error: AxiosError<{message : string}>) => {
        console.log("Error removing book:", error.response?.data?.message || error.message);
      }
  })
}
export default useRemoveBookFromCart;

