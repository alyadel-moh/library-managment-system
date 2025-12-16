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
interface ModifyResponse {
  message: string;
}

const useModifyUser = () => {
  return useMutation<ModifyResponse, AxiosError<{ message: string }>, User>({
    mutationFn: (newUser: User) => {
      const token = localStorage.getItem('accessToken');
      return axios
        .put<ModifyResponse>("http://localhost:8080/api/user/profile", newUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data);
    },
    onSuccess: (data: ModifyResponse) => {
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