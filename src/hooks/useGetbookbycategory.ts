import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type Book1 from "../entities/Book";
const useGetBooksbycategory = (category : string,search : string) =>{
  return useQuery<Book1[]>({
    queryKey: ['books', category],
    queryFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.get(
        `http://localhost:8080/api/user/book/search/category/${encodeURIComponent(category)}/${encodeURIComponent(search)}`,
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
    enabled: !!localStorage.getItem('accessToken') && !!category,  // only run if token exists AND category is provided
    retry: false // do not retry on failure
  });
}
export default useGetBooksbycategory;