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
const useGetBooksbyisbn = ({isbn} : {isbn: string}) =>{
  return useQuery<Book>({
    queryKey: ['books', isbn],
    queryFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.get(
        `http://localhost:8080/api/admin/book/${isbn}`,
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
    enabled: !!localStorage.getItem('accessToken') && !!isbn,  // only run if token exists AND isbn is provided
    retry: false // do not retry on failure
  });
}
export default useGetBooksbyisbn;
