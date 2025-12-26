import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
interface Book {
    isbn : string;
    title : string;
    publicationYear : number;
    publisherId : number;
    authorIds : Array<number>;
    categoryId : number;
    sellingPrice : number;
    stockQuantity    : number;
    threshold : number;
}

interface ModifyResponse {
  message: string;
}

export const useModifyBook = (isbn: string) => {
  return useMutation<ModifyResponse, AxiosError<{ message: string }>, Book>({
    mutationFn:async (updatedBook: Book) => {
      const token = localStorage.getItem("accessToken");
      return axios
        .put<ModifyResponse>(
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
    onSuccess: (data: ModifyResponse) => {
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