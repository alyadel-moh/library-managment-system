import {  useQuery } from "@tanstack/react-query";
import { ApiClient } from "../api-client";
interface IndustryIdentifier {
  type: string;
  identifier: string;
}

interface Dimensions {
  height: string;
  width: string;
  thickness: string;
}

interface ImageLinks {
  smallThumbnail?: string;
  thumbnail?: string;
  small?: string;
  medium?: string;
  large?: string;
  extraLarge?: string;
}

interface VolumeInfo {
  title: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  industryIdentifiers?: IndustryIdentifier[];
  pageCount?: number;
  dimensions?: Dimensions;
  printType?: string;
  mainCategory?: string;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  contentVersion?: string;
  imageLinks?: ImageLinks;
  language?: string;
  previewLink?: string;
  infoLink?: string;
  canonicalVolumeLink?: string;
}

interface UserInfo {
  review?: any;
  readingPosition?: any;
  isPurchased?: boolean;
  isPreordered?: boolean;
  updated?: string;
}

interface Price {
  amount: number;
  currencyCode: string;
}

interface SaleInfo {
  country?: string;
  saleability?: string;
  onSaleDate?: string;
  isEbook?: boolean;
  listPrice?: Price;
  retailPrice?: Price;
  buyLink?: string;
}

interface FormatAccess {
  isAvailable: boolean;
  downloadLink?: string;
  acsTokenLink?: string;
}

interface DownloadAccess {
  kind: string;
  volumeId: string;
  restricted: boolean;
  deviceAllowed: boolean;
  justAcquired: boolean;
  maxDownloadDevices: number;
  downloadsAcquired: number;
  nonce: string;
  source: string;
  reasonCode: string;
  message: string;
  signature: string;
}

interface AccessInfo {
  country?: string;
  viewability?: string;
  embeddable?: boolean;
  publicDomain?: boolean;
  textToSpeechPermission?: string;
  epub?: FormatAccess;
  pdf?: FormatAccess;
  webReaderLink?: string;
  accessViewStatus?: string;
  downloadAccess?: DownloadAccess;
}

interface SearchInfo {
  textSnippet?: string;
}

export interface Book {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  userInfo?: UserInfo;
  saleInfo?: SaleInfo;
  accessInfo?: AccessInfo;
  searchInfo?: SearchInfo;
}

interface GoogleBooksResponse {
  kind: string;
  totalItems: number;
  items?: Book[];
}

const useGetGoogleBooks = (query: string) => {
  return useQuery<GoogleBooksResponse>({
    queryKey: ["googleBooks", query],
    queryFn: async () => new ApiClient<Book>(`/volumes?q=${query}`).getAll(),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes (formerly cacheTime)
    retry: 1, // Only retry once on failure
    retryDelay: 2000, // Wait 2 seconds before retry
    enabled: !!query && query.length > 0, // Only run if query exists
  })
};

export default useGetGoogleBooks;

