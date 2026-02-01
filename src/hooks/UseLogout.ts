import { useMutation } from "@tanstack/react-query";
import ApiClient1 from "../api-client";
import type BackendResponse from "../entities/Response";
const apiClient = new ApiClient1<BackendResponse>("/auth/logout");

const useLogout = () => {
  return useMutation({
    mutationFn: () => apiClient.getSingle(),
    onSuccess: (data) => {
       console.log(data.message)
      localStorage.removeItem("accessToken");
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    }
  });
}

export default useLogout;