import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ApiClient1 from "../api-client";

interface User {
  oldPassword: string;
  newPassword: string;
}
import type BackendResponsemessage from "../entities/Response";

const apiClient = new ApiClient1<User>("/user/profile/password");

const useModifyUser = () => {
  return useMutation<BackendResponsemessage, AxiosError<{ message: string }>, User>({
    mutationFn:(newUser: User) => apiClient.put(newUser) as unknown as Promise<BackendResponsemessage>,
    onSuccess: (data: BackendResponsemessage) => {
      console.log("password modified successfully:", data);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(
        "Error modifying password:",
        error.response?.data?.message || error.message
      );
    },
  });
};
export default useModifyUser;