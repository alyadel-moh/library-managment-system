import { useQuery } from "@tanstack/react-query";
import axios from "axios";      
interface NumberofbooksorderedResponse {
   total_restocked_books: number,
    book_isbn: string,
    book_Title: string,
    total_spent: number,
    order_count: number
}
const useGetnumberofbooksordered = (isbn: string) =>{
  return useQuery<NumberofbooksorderedResponse>({
    queryKey: ['numberofbooksordered', isbn],
    queryFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.get(
        `http://localhost:8080/api/admin/reports/restock-count/${isbn}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ).then((response) => {
        console.log('Numberofbooksordered fetched successfully:', response.data);
        return response.data;
      });
    },
    enabled: !!localStorage.getItem('accessToken'),  // only run if token exists
    retry: false // do not retry on failure
  });
}
export default useGetnumberofbooksordered;