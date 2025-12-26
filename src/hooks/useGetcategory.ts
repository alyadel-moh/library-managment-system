import { useQuery } from "@tanstack/react-query";
import axios from "axios";
;

export interface Category {
    id: number;
    name: string;
}
const useGetCategories = () =>{
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.get(
        "http://localhost:8080/api/admin/category",
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ).then((response) => {
        console.log('Category fetched successfully:', response.data);
        return response.data;
      });
    },
    enabled: !!localStorage.getItem('accessToken'),  // only run if token exists
    retry: false // do not retry on failure
  });
}
export default useGetCategories;
