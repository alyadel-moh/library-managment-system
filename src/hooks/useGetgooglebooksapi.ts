import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../api-client";

/** * LEAN INTERFACES
 * We only define exactly what we are requesting from the API.
 */
export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    description?: string;
    averageRating?: number;
    imageLinks?: {
      thumbnail?: string;
    };
  };
}

interface GoogleBooksResponse {
  items?: Book[];
}

const useGetGoogleBooks = (query: string) => {
  // Constructing the partial response fields
  // This tells Google: "Don't send me everything, just send these keys."
  const fields = "items(id,volumeInfo(title,description,averageRating,imageLinks/thumbnail))";

  return useQuery<GoogleBooksResponse>({
    queryKey: ["googleBooks", query],
    queryFn : async () => 
      new ApiClient<Book>(
        `/volumes?q=${encodeURIComponent(query)}&fields=${fields}`
      ).getAll(),
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
    retry: 1,
    enabled: !!query && query.length > 0,
  });
};

export default useGetGoogleBooks;