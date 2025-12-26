import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
interface checkout {
  cardNumber : string
    expiryDate: string,
    cvv: string,
    expectedTotal: string
}
interface ModifyResponse {
  message: string;
}

const useCardcheckout = () => {
  return useMutation<ModifyResponse, AxiosError<{ message: string }>,checkout>({
    mutationFn: (checkoutData) => {
      const token = localStorage.getItem('accessToken');
      return axios
        .post<ModifyResponse>("https://localhost:8443/api/user/cart/checkout", checkoutData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data);
    },
    onSuccess: (data: ModifyResponse) => {
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