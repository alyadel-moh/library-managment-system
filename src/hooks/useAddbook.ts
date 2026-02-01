import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ApiClient1 from "../api-client";
import type { Book2 } from "../entities/Book";
import type BackendResponse from "../entities/Response";

const apiClient = new ApiClient1<Book2>("/admin/book");

const useAddBook = () =>{
  return useMutation<BackendResponse, AxiosError<{message : string}>, Book2>({
    mutationFn: (newBook: Book2) => apiClient.post(newBook) as unknown as Promise<BackendResponse>,
      onMutate :(newBook: Book2) => {
        console.log("Adding book:", newBook);
      },
      onSuccess : (data: BackendResponse) => {
        console.log("Book added successfully:", data);
      },
      onError :(error: AxiosError<{message : string}>) => {
        console.log("Error adding book:", error.response?.data?.message || error.message);
      }
  })
}
export default useAddBook;