import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type User from "../entities/User";
import type BackendResponsemessage from "../entities/Response";
const useModifyUser = () => {
  return useMutation<BackendResponsemessage, AxiosError<{ message: string }>, User>({
    mutationFn:async (newUser: User) => {
      const token = localStorage.getItem('accessToken');
      return axios
        .put<BackendResponsemessage>("http://localhost:8080/api/user/profile", newUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data);
    },
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