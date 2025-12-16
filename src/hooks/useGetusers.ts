import { useQuery } from "@tanstack/react-query";
import axios from "axios";      

export interface User {
  username: string;
  password: string;
  firstName: string;
  lastname: string;
  phoneNumber: string;
  shippingAddress: string;
  emailAddress: string;
  role : string;
}
const useGetUser = () =>{
  return useQuery<User>({
    queryKey: ['userProfile'],
    queryFn: () => {
      const token = localStorage.getItem('accessToken');
      return axios.get(
        "http://localhost:8080/api/user/profile",
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
export default useGetUser;

