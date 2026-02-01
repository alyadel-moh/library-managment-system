import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ApiClient1 from "../api-client";
import type BackendResponsemessage from "../entities/Response";

const apiClient = new ApiClient1<BackendResponsemessage>("/admin/order/confirm");

const useConfirmOrder = () => {
  return useMutation<BackendResponsemessage, AxiosError<{ message: string }>, number>({
    mutationFn: (orderid: number) => apiClient.put({}, orderid) as unknown as Promise<BackendResponsemessage>,
    onSuccess: (data: BackendResponsemessage) => {
      console.log("Order confirmed successfully:", data);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(
        "Error confirming order:",
        error.response?.data?.message || error.message
      );
    },
  });
};

export default useConfirmOrder;