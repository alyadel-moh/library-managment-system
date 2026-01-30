import { useQuery } from "@tanstack/react-query";
import axios from "axios";      
import type Book1 from "../entities/Book";
const useGetsavedbooks = () =>{
  return useQuery<Book1[]>({
    queryKey: ['SavedBooks'],
    queryFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.get(
        "http://localhost:8080/api/user/book/saved-books",
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ).then((response) => {
        console.log('Saved books fetched successfully:', response.data);
        return response.data;
      });
    },
    enabled: !!localStorage.getItem('accessToken'),  // only run if token exists
    retry: false // do not retry on failure
  });
}
export default useGetsavedbooks;

