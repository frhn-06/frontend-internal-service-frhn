import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";


const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


interface CustomSession extends Session {
    accessToken?: string;
}


instance.interceptors.request.use(async (request) => {
    const session : CustomSession | null = await getSession();
 
    if(session && session?.accessToken) {
        request.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return request;
}, (error) => {
    return Promise.reject(error);
});


instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const errorResponse = error.response;
    if(errorResponse?.data) {
        const customError = {
            message: errorResponse?.data?.meta?.message,
            data: errorResponse?.data?.data,
            status: errorResponse?.data?.meta?.status
        }
    
        return Promise.reject(customError);
    }
    return Promise.reject(error);
});

export default instance;