import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ApiClient1 from "../api-client";
import type User from "../entities/User";
import type BackendResponse from "../entities/Response";

const apiClient = new ApiClient1<BackendResponse>("/auth/signup");

const useAddUser = () =>{
  return useMutation<BackendResponse, AxiosError<{message : string}>, User>({
    mutationFn: (newUser: User) => apiClient.postPublic(newUser),
      onMutate :(newUser: User) => {
        console.log("Adding user:", newUser);
      },
      onSuccess : (data: BackendResponse) => {
        console.log("User added successfully:", data);
      },
      onError :(error: AxiosError<{message : string}>) => {
        console.log("Error adding user:", error.response?.data?.message || error.message);
      }
  })
}
export default useAddUser;

