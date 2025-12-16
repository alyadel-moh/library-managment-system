import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
interface User1 {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
}
const useLoginUser = () =>{
  return useMutation<LoginResponse, AxiosError<{message : string}>, User1>({
    mutationFn: (newUser: User1) => 
      axios.post<LoginResponse>(
        "http://localhost:8080/api/auth/login",
        newUser
      ).then((response) => response.data),
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

