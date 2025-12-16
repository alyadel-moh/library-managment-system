import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface Author {
    authorId: number;
    firstName: string;
    lastName: string;
}
const useGetAuthors = () =>{
  return useQuery<Author[]>({
    queryKey: ['authors'],
    queryFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.get(
        "http://localhost:8080/api/admin/author",
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ).then((response) => {
        console.log('Author fetched successfully:', response.data);
        return response.data;
      });
    },
    enabled: !!localStorage.getItem('accessToken'),  // only run if token exists
    retry: false // do not retry on failure
  });
}
export default useGetAuthors;
