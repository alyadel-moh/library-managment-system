import { useQuery } from "@tanstack/react-query";
import ApiClient1 from "../api-client";

interface NumberofbooksorderedResponse {
   totalRestockedBooks: number,
    bookIsbn: string,
    bookTitle: string,
    totalSpent: number,
    orderCount: number,
    photoUrl : string | null
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