import axios from "axios";
const axiosinstance = axios.create({
    baseURL: "https://www.googleapis.com/books/v1",
    params :{
        key : "AIzaSyAbzMqcI8sn4ZBvgpApqOpINm-g7tKfPIU"
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
    baseURL :"https://ordering-system-58at.onrender.com/api",
    headers: {
        'Content-Type': 'application/json'
    }
});
export default class ApiClient1<T> {
    endpoint : string;
    constructor(endpoint : string){
        this.endpoint = endpoint;
    }
    getAll = (params?: any) => {
        const token = localStorage.getItem('accessToken');
        return axiosinstance1.get<T[]>(this.endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: params
        }).then(res => res.data);
    }
    
    get(id : string | number) {
        const token = localStorage.getItem('accessToken');
        return axiosinstance1.get<T>(this.endpoint + '/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.data);
    }
    
    // Get without appending ID (for endpoints like /user/profile or /user/cart)
    getSingle() {
        const token = localStorage.getItem('accessToken');
        return axiosinstance1.get<T>(this.endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.data);
    }
    
    // Get single object with query parameters
    getSingleWithParams(params?: any) {
        const token = localStorage.getItem('accessToken');
        return axiosinstance1.get<T>(this.endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: params
        }).then(res => res.data);
    }
    
    getArray(id: string | number) {
        const token = localStorage.getItem('accessToken');
        return axiosinstance1.get<T[]>(this.endpoint + '/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.data);
    }
    
    post(data: T | any = {}, pathParam?: string | number) {
        const token = localStorage.getItem('accessToken');
        const url = pathParam ? `${this.endpoint}/${pathParam}` : this.endpoint;
        return axiosinstance1.post<T>(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.data);
    }
    
    // For public endpoints that don't require authentication (login, signup)
    postPublic(data: T | any = {}) {
        return axiosinstance1.post<T>(this.endpoint, data).then(res => res.data);
    }
    
    put(data: T | any = {}, pathParam?: string | number) {
        const token = localStorage.getItem('accessToken');
        const url = pathParam ? `${this.endpoint}/${pathParam}` : this.endpoint;
        return axiosinstance1.put<T>(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.data);
    }
    
    delete(id: string | number) {
        const token = localStorage.getItem('accessToken');
        return axiosinstance1.delete<T>(this.endpoint + '/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.data);
    }
    
    // Delete without appending ID (for endpoints like /user/profile/picture)
    deleteSingle() {
        const token = localStorage.getItem('accessToken');
        return axiosinstance1.delete<T>(this.endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.data);
    }
}