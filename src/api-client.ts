import axios from "axios";
const axiosinstance = axios.create({
    baseURL: "https://www.googleapis.com/books/v1",
    params :{
        key : "AIzaSyAbzMqcI8sn4ZBvgpApqOpINm-g7tKfPIU"
    }
});
class ApiClient<T> {
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
export default ApiClient
