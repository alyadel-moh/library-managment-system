import { useQuery } from "@tanstack/react-query";
import axios from "axios";      

interface Publisher{
    publisherId : number;
    publisherName : string;
    address : string;
    Phone : string;
}
const useGetPublishers = () =>{
  return useQuery<Publisher[]>({
    queryKey: ['Publishers'],
    queryFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.get(
        "http://localhost:8080/api/admin/publisher",
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ).then((response) => {
        console.log('Publishers fetched successfully:', response.data);
        return response.data;
      });
    },
    enabled: !!localStorage.getItem('accessToken'),  // only run if token exists
    retry: false // do not retry on failure
  });
}
export default useGetPublishers;

