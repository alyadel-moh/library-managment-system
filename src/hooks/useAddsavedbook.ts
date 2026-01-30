import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type BackendResponse from "../entities/Response";
const useAddBooktosavedbooks = (isbn : string) =>{
  return useMutation<BackendResponse, AxiosError<{message : string}>>({
    mutationFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.post<BackendResponse>(
        `http://localhost:8080/api/user/book/saved-books/${isbn}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ).then((response) => response.data);
    },
      onSuccess : (data: BackendResponse) => {
        console.log("Book added to saved books successfully : ", data);
      },
      onError :(error: AxiosError<{message : string}>) => {
        console.log("Error adding book to saved books : ", error.response?.data?.message || error.message);
      }
  })
}
export default  useAddBooktosavedbooks;