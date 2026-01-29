import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type { Book2 } from "../entities/Book";
import type BackendResponse from "../entities/Response"; 
const useAddBook = () =>{
  return useMutation<BackendResponse, AxiosError<{message : string}>, Book2>({
    mutationFn: async (newBook: Book2) => {
      const token = localStorage.getItem('accessToken');
      return axios.post<BackendResponse>(
        "http://localhost:8080/api/admin/book",
        newBook,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ).then((response) => response.data);
    },
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