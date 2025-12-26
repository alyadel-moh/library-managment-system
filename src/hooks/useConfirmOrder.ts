import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface ModifyResponse {
  message: string;
}


const useConfirmOrder = () => {
  return useMutation<ModifyResponse, AxiosError<{ message: string }>, number>({
    mutationFn: async (orderid: number) => {
      const token = localStorage.getItem("accessToken");
      return axios
        .put<ModifyResponse>(
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
    onSuccess: (data: ModifyResponse) => {
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