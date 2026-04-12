import axios, { type InternalAxiosRequestConfig } from "axios";
const axiosinstance1 = axios.create({
    baseURL:  "https://ordering-system-58at.onrender.com/api",
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