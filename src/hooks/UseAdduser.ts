import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type User from "../entities/User";
import type BackendResponse from "../entities/Response";
const useAddUser = () =>{
  return useMutation<BackendResponse, AxiosError<{message : string}>, User>({
    mutationFn: async (newUser: User) => 
      axios.post<BackendResponse>(
        "http://localhost:8080/api/auth/signup",
        newUser
      ).then((response) => response.data),
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

