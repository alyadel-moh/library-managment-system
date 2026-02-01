import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ApiClient1 from "../api-client";
import type BackendResponsemessage from "../entities/Response";

const useModifyquantity = (quantity: number, isbn: string) => {
  const apiClient = new ApiClient1<BackendResponsemessage>(`/user/cart/update/${isbn}`);
  return useMutation<BackendResponsemessage, AxiosError<{ message: string }>>({
    mutationFn:() => apiClient.put({}, quantity) as unknown as Promise<BackendResponsemessage>,
    onSuccess: (data: BackendResponsemessage) => {
      console.log("quantity modified successfully:", data);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(
        "Error modifying quantity:",
        error.response?.data?.message || error.message
      );
    },
  });
};
export default useModifyquantity;