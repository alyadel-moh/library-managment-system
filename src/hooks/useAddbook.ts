import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface Book {
    isbn : string;
    title : string;
    publicationYear : number;
    publisherId : number;
    authorIds : Array<string>;
    categoryId : number;
    sellingPrice : number;
    stockQuantity : number;
    threshold : number;
}
interface LoginResponse {
  status: string;
  message: string;
}
const useAddBook = () =>{
  return useMutation<LoginResponse, AxiosError<{message : string}>, Book>({
    mutationFn: (newBook: Book) => {
      const token = localStorage.getItem('accessToken');
      return axios.post<LoginResponse>(
        "http://localhost:8080/api/admin/book",
        newBook,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ).then((response) => response.data);
    },
      onMutate :(newBook: Book) => {
        console.log("Adding book:", newBook);
      },
      onSuccess : (data: LoginResponse) => {
        console.log("Book added successfully:", data);
      },
      onError :(error: AxiosError<{message : string}>) => {
        console.log("Error adding book:", error.response?.data?.message || error.message);
      }
  })
}
export default useAddBook;