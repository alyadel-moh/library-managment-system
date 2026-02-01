import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ApiClient1 from "../api-client";
import type BackendResponsemessage from "../entities/Response";

const apiClient = new ApiClient1<{ photoUrl: string }>("/user/profile/picture");

const useUpdateProfilePhoto = () => {
  return useMutation<
    BackendResponsemessage,
    AxiosError<{ message: string }>,
    string
  >({
    mutationFn: (photoUrl: string) => apiClient.put({ photoUrl }) as unknown as Promise<BackendResponsemessage>,
    onSuccess: (data: BackendResponsemessage) => {
      console.log("profile photo updated successfully:", data);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(
        "Error updating profile photo:",
        error.response?.data?.message || error.message,
      );
    },
  });
};
export default useUpdateProfilePhoto;
