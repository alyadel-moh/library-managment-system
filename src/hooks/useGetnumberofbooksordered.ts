import { useQuery } from "@tanstack/react-query";
import ApiClient1 from "../api-client";

interface NumberofbooksorderedResponse {
   total_restocked_books: number,
    book_isbn: string,
    book_Title: string,
    total_spent: number,
    order_count: number
}

const useGetnumberofbooksordered = (isbn: string) =>{
  const apiClient = new ApiClient1<NumberofbooksorderedResponse>(`/admin/reports/restock-count`);
  return useQuery<NumberofbooksorderedResponse>({
    queryKey: ['numberofbooksordered', isbn],
    queryFn: () => apiClient.get(isbn),
    enabled: !!localStorage.getItem('accessToken'),  // only run if token exists
    retry: false // do not retry on failure
  });
}
export default useGetnumberofbooksordered;