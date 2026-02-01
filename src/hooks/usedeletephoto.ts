import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import ApiClient1 from '../api-client'  
import type BackendResponsemessage from '../entities/Response';
const Usedeletephoto = () => {
    const apiClient = new ApiClient1<BackendResponsemessage>('/user/profile/picture');
  return useMutation<BackendResponsemessage, AxiosError<{message : string}>>({
    mutationFn: () => apiClient.deleteSingle() as Promise<BackendResponsemessage>,
      onSuccess : (data: BackendResponsemessage) => {
        console.log("photo removed successfully:", data);
      },
      onError :(error: AxiosError<{message : string}>) => {
        console.log("Error removing photo:", error.response?.data?.message || error.message);
      }
  })
}

export default Usedeletephoto