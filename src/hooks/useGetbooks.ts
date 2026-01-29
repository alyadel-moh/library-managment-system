 import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type Book1 from "../entities/Book";

const useGetbooks = () => {
  return useQuery<Book1[]>({
    queryKey: ['books'],
    queryFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.get(
        `http://localhost:8080/api/user/book/all`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ).then((response) => {
        console.log('Books fetched successfully:', response.data);
        return response.data;
      });
    },
    enabled: true,  // always run
    retry: false // do not retry on failure
  });
}

export default useGetbooks;
