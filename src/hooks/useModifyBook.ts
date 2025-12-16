import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface Book {
  isbn: string;
  title: string;
  publicationYear: number;
  publisherId: number;
  authorIds: Array<number>;
  categoryId: number;
  sellingPrice: number;
  stockQuantity: number;
  threshold: number;
}

interface ModifyResponse {
  message: string;
}

const useModifyStock = () => {
  return useMutation<ModifyResponse, AxiosError<{ message: string }>, Book>({
    mutationFn: (newStock: Book) => {
      const token = localStorage.getItem("accessToken");
      return axios
        .put<ModifyResponse>(
          `http://localhost:8080/api/admin/book/${newStock.isbn}`,
          { stockQuantity: newStock.stockQuantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => response.data);
    },
    onSuccess: (data: ModifyResponse) => {
      console.log("Stock modified successfully:", data);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(
        "Error modifying stock:",
        error.response?.data?.message || error.message
      );
    },
  });
};

export const useModifyBook = () => {
  return useMutation<ModifyResponse, AxiosError<{ message: string }>, Book>({
    mutationFn: (updatedBook: Book) => {
      const token = localStorage.getItem("accessToken");
      return axios
        .put<ModifyResponse>(
          `http://localhost:8080/api/admin/book/${updatedBook.isbn}`,
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

export default useModifyStock;