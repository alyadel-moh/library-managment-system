import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type BackendResponsemessage from "../entities/Response";
const useModifyquantity = (quantity: number, isbn: string) => {
  return useMutation<BackendResponsemessage, AxiosError<{ message: string }>>({
    mutationFn:async () => {
      const token = localStorage.getItem('accessToken');
      return axios
        .put<BackendResponsemessage>(
          `http://localhost:8080/api/user/cart/update/${isbn}/${quantity}`,
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