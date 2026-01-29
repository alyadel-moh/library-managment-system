import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type { Book2 } from "../entities/Book";
import type BackendResponsemessage from "../entities/Response";

export const useModifyBook = (isbn: string) => {
  return useMutation<BackendResponsemessage, AxiosError<{ message: string }>, Book2>({
    mutationFn:async (updatedBook: Book2) => {
      const token = localStorage.getItem("accessToken");
      return axios
        .put<BackendResponsemessage>(
          `http://localhost:8080/api/admin/book/${isbn}`,
          updatedBook,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => response.data);
    },
    onSuccess: (data: BackendResponsemessage) => {
      console.log("Book modified successfully:", data);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(
        "Error modifying book:",
        error.response?.data?.message || error.message
      );
    },
  });
};

export default useModifyBook;