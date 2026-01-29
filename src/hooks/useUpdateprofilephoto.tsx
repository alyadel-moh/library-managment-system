import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type BackendResponsemessage from "../entities/Response";
const useUpdateProfilePhoto = () => {
  return useMutation<
    BackendResponsemessage,
    AxiosError<{ message: string }>,
    string
  >({
    mutationFn: async (photoUrl: string) => {
      const token = localStorage.getItem("accessToken");
      return axios
        .put<BackendResponsemessage>(
          "http://localhost:8080/api/user/profile/picture",
          { photoUrl },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => response.data);
    },
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
