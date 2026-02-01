import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ApiClient1 from "../api-client";
import type User from "../entities/User";
import type BackendResponsemessage from "../entities/Response";

const apiClient = new ApiClient1<User>("/user/profile");

const useModifyUser = () => {
  return useMutation<BackendResponsemessage, AxiosError<{ message: string }>, User>({
    mutationFn:(newUser: User) => apiClient.put(newUser) as unknown as Promise<BackendResponsemessage>,
    onSuccess: (data: BackendResponsemessage) => {
      console.log("User modified successfully:", data);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(
        "Error modifying user:",
        error.response?.data?.message || error.message
      );
    },
  });
};
export default useModifyUser;