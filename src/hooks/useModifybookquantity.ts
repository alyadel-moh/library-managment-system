import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
interface ModifyResponse {
  message: string;
}

const useModifyquantity = (quantity: number, isbn: string) => {
  return useMutation<ModifyResponse, AxiosError<{ message: string }>>({
    mutationFn:async () => {
      const token = localStorage.getItem('accessToken');
      return axios
        .put<ModifyResponse>(
          `http://localhost:8080/api/user/cart/decrease/${isbn}/${quantity}`,
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