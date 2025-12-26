import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Author } from "./useGetauthors";
import type { Publisher } from "./useGetpublishers";
import type { Category } from "./useGetcategory";
interface Book {
    isbn : string;
    title : string;
    publicationYear : number;
    publisher : Publisher;
    authors : Array<Author>;
    category : Category;
    sellingPrice : number;
    stockQuantity   : number;
    threshold : number;
}
const useGetBooksbytitle = ({title} : {title: string}) =>{
  return useQuery<Book[]>({
    queryKey: ['books', title],
    queryFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.get(
        `http://localhost:8080/api/user/book/title/${encodeURIComponent(title)}`,
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
    enabled: !!localStorage.getItem('accessToken') && !!title,  // only run if token exists AND title is provided
    retry: false // do not retry on failure
  });
}
export default useGetBooksbytitle;