import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ApiClient1 from "../api-client";

interface User1 {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

const apiClient = new ApiClient1<LoginResponse>("/auth/login");

const useLoginUser = () =>{
  return useMutation<LoginResponse, AxiosError<{message : string}>, User1>({
    mutationFn : (newUser: User1) => apiClient.postPublic(newUser),
      onSuccess : (data: LoginResponse) => {
        if (data.token) {
        localStorage.setItem('accessToken', data.token);
      } 
        return console.log("User logged in successfully:", data);
      },
      onError :(error: AxiosError<{message : string}>) => {
        console.log("Error logging in:", error.response?.data?.message || error.message);
      }
  })
}
export default useLoginUser;

