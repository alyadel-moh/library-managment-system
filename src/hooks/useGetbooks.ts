import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
const useGetBooks = () =>{
  return useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.get(
        "http://localhost:8080/api/book",
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ).then((response) => {
        console.log('User fetched successfully:', response.data);
        return response.data;
      });
    },
    enabled: !!localStorage.getItem('accessToken'),  // only run if token exists
    retry: false // do not retry on failure
  });
}
export default useGetBooks;
