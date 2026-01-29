import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type Book1 from "../entities/Book";
const useGetBooksbytitle = (title : string) =>{
  return useQuery<Book1[]>({
    queryKey: ['books', title],
    queryFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.get(
        `http://localhost:8080/api/user/book/search/${encodeURIComponent(title)}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ).then((response) => {
        console.log('Book fetched successfully:', response.data);
        return response.data;
      });
    },
    enabled: !!title,  // only run if title is provided
    retry: false // do not retry on failure
  });
}
export default useGetBooksbytitle;