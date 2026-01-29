import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
interface checkout {
  cardNumber : string
    expiryDate: string,
    cvv: string,
    expectedTotal: string
}
import type BackendResponsemessage from "../entities/Response";
const useCardcheckout = () => {
  return useMutation<BackendResponsemessage, AxiosError<{ message: string }>,checkout>({
    mutationFn: async (checkoutData) => {
      const token = localStorage.getItem('accessToken');
      return axios
        .post<BackendResponsemessage>("https://localhost:8443/api/user/cart/checkout", checkoutData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: false,
        })
        .then((response) => response.data);
    },
    onSuccess: (data: BackendResponsemessage) => {
      console.log("Checkout successful:", data);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(
        "Error during checkout:",
        error.response?.data?.message || error.message
      );
    },
  });
};
export default useCardcheckout;