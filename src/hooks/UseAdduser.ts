import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface User {
  username: string;
  password: string;
  firstName: string;
  lastname: string;
  phoneNumber: string;
  shippingAddress: string;
  emailAddress: string;
}
interface LoginResponse {
  status: string;
  message: string;
}
const useAddUser = () =>{
  return useMutation<LoginResponse, AxiosError<{message : string}>, User>({
    mutationFn: async (newUser: User) => 
      axios.post<LoginResponse>(
        "http://localhost:8080/api/auth/signup",
        newUser
      ).then((response) => response.data),
      onMutate :(newUser: User) => {
        console.log("Adding user:", newUser);
      },
      onSuccess : (data: LoginResponse) => {
        console.log("User added successfully:", data);
      },
      onError :(error: AxiosError<{message : string}>) => {
        console.log("Error adding user:", error.response?.data?.message || error.message);
      }
  })
}
export default useAddUser;

