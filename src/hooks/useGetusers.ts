import { useQuery } from "@tanstack/react-query";
import ApiClient1 from "../api-client";

export interface User {
  username: string;
  password: string;
  firstName: string;
  lastname: string;
  phoneNumber: string;
  shippingAddress: string;
  emailAddress: string;
  photoUrl?: string;
  role : string;
}

const apiClient = new ApiClient1<User>("/user/profile");

const useGetUser = () =>{
  return useQuery<User>({
    queryKey: ['userProfile'],
    queryFn: () => apiClient.getSingle(),
    enabled: !!localStorage.getItem('accessToken'),  // only run if token exists
    retry: false // do not retry on failure
  });
}
export default useGetUser;

