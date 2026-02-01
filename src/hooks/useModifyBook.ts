import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ApiClient1 from "../api-client";
import type { Book2 } from "../entities/Book";
import type BackendResponsemessage from "../entities/Response";

export const useModifyBook = (isbn: string) => {
  const apiClient = new ApiClient1<Book2>("/admin/book");
  return useMutation<BackendResponsemessage, AxiosError<{ message: string }>, Book2>({
    mutationFn:(updatedBook: Book2) => apiClient.put(updatedBook, isbn) as unknown as Promise<BackendResponsemessage>,
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