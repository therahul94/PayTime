import axios from "axios";

const axiosInstance = axios.create({});

export const apiConnector = (url, method, headers, data)=>{
    return axiosInstance({
        url: url,
        method: method,
        headers: headers,
        data: data?data:null
    })
}
