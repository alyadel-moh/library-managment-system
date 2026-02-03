import { useMutation } from "@tanstack/react-query";
import ApiClient1 from "../api-client";
import { AxiosError } from "axios";
import type BackendResponse from "../entities/Response";

const apiClient = new ApiClient1<BackendResponse>("/payments/verify-payment");

const useVerifyPayment = () => {
  return useMutation<BackendResponse, AxiosError<{ message: string }>, string>({
    mutationFn: (sessionId: string) => apiClient.post({ sessionId }) as Promise<BackendResponse>,
  });
};

export default useVerifyPayment;