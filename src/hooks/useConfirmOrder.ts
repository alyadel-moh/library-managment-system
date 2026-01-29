import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type BackendResponsemessage from "../entities/Response";
const useConfirmOrder = () => {
  return useMutation<BackendResponsemessage, AxiosError<{ message: string }>, number>({
    mutationFn: async (orderid: number) => {
      const token = localStorage.getItem("accessToken");
      return axios
        .put<BackendResponsemessage>(
          `http://localhost:8080/api/admin/order/confirm/${orderid}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => response.data);
    },
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