import { useMutation } from "@tanstack/react-query";
import ApiClient1 from "../api-client";
import { AxiosError } from "axios";

interface CheckoutResponse {
  url: string;
}

const apiClient = new ApiClient1<CheckoutResponse>("/payments/create-checkout-session");

const useMakepayment = () => {
  return useMutation<CheckoutResponse, AxiosError<{ message: string }>>({
    mutationFn: () => apiClient.post() as Promise<CheckoutResponse>,
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      console.error("Checkout error:", error.response?.data?.message || error.message);
    },
  });
};

export default useMakepayment;