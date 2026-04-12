import axios, { type InternalAxiosRequestConfig } from "axios";

const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;
const apiBaseUrl = typeof rawApiBaseUrl === 'string' ? rawApiBaseUrl.trim().replace(/\/$/, '') : '';

if (!apiBaseUrl) {
    throw new Error('Missing API base URL. Set VITE_API_BASE_URL (or legacy VITE_API_URL) in environment variables.');
}

const axiosinstance = axios.create({
    baseURL: "https://www.googleapis.com/books/v1",
    params: {
        // Pulling the key securely from your new .env file
        key: import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
    }
});
export class ApiClient<T> {
    endpoint : string;
    constructor(endpoint : string){
        this.endpoint = endpoint;
    }
    getAll = () => {
        return axiosinstance.get<GoogleBooksResponse<T>>(this.endpoint).then(res => res.data);
    }
    get(id : string | number) {
        return axiosinstance.get<T>(this.endpoint + '/' +id).then(res => res.data);
    }
}
interface GoogleBooksResponse<T> {
  kind: string;
  totalItems: number;
  items?: T[];
}
const axiosinstance1 = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});
axiosinstance1.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosinstance1.interceptors.response.use((response) => {
    if (typeof response.data === 'string' && /<!doctype html>/i.test(response.data)) {
        return Promise.reject(new Error(`Expected JSON from API but got HTML. Check VITE_API_BASE_URL/VITE_API_URL and endpoint: ${response.config.url ?? 'unknown'}`));
    }
    return response;
}, (error) => Promise.reject(error));

export default class ApiClient1<T> {
    endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = (params?: Record<string, unknown>) => {
        return axiosinstance1.get<T[]>(this.endpoint, { params: params }).then(res => res.data);
    }

    get(id: string | number) {
        return axiosinstance1.get<T>(this.endpoint + '/' + id).then(res => res.data);
    }

    // Get without appending ID (for endpoints like /user/profile or /user/cart)
    getSingle() {
        return axiosinstance1.get<T>(this.endpoint).then(res => res.data);
    }

    // Get single object with query parameters
    getSingleWithParams(params?: Record<string, unknown>) {
        return axiosinstance1.get<T>(this.endpoint, { params: params }).then(res => res.data);
    }

    getArray(id: string | number) {
        return axiosinstance1.get<T[]>(this.endpoint + '/' + id).then(res => res.data);
    }

    post(data: unknown = {}, pathParam?: string | number) {
        const url = pathParam ? `${this.endpoint}/${pathParam}` : this.endpoint;
        return axiosinstance1.post<T>(url, data).then(res => res.data);
    }

    // For public endpoints that don't require authentication (login, signup)
    postPublic(data: unknown = {}) {
        return axiosinstance1.post<T>(this.endpoint, data).then(res => res.data);
    }

    put(data: unknown = {}, pathParam?: string | number) {
        const url = pathParam ? `${this.endpoint}/${pathParam}` : this.endpoint;
        return axiosinstance1.put<T>(url, data).then(res => res.data);
    }

    delete(id: string | number) {
        return axiosinstance1.delete<T>(this.endpoint + '/' + id).then(res => res.data);
    }

    // Delete without appending ID (for endpoints like /user/profile/picture)
    deleteSingle() {
        return axiosinstance1.delete<T>(this.endpoint).then(res => res.data);
    }
}