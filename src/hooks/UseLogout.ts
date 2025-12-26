import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(
        "http://localhost:8080/api/auth/logout",
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
       console.log(data.message)
      localStorage.removeItem("accessToken");
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    }
  });
}

export default useLogout;