import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ApiClient1 from "../api-client";
import type BackendResponse from "../entities/Response";

const apiClient = new ApiClient1<BackendResponse>("/user/book/saved-books");

const useAddBooktosavedbooks = () =>{
  return useMutation<BackendResponse, AxiosError<{message : string}>,string>({
      mutationFn : (isbn: string) => apiClient.post({}, isbn),
      onSuccess : (data: BackendResponse) => {
        console.log("Book added to saved books successfully : ", data);
      },
      onError :(error: AxiosError<{message : string}>) => {
        console.log("Error adding book to saved books : ", error.response?.data?.message || error.message);
      }
  })
}
export default  useAddBooktosavedbooks;