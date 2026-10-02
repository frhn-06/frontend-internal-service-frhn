import axios from "axios";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";


const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
// baseURL: process.env.NEXT_PUBLIC_API_URL_LOCAL,
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

let isSignOutInProgress = false;

instance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const errorResponse = error.response;
    
    if(errorResponse?.data) {
        const customError = {
            message: errorResponse?.data?.meta?.message,
            data: errorResponse?.data?.data,
            status: errorResponse?.data?.meta?.status
        }

        if(!isSignOutInProgress && (customError.message === "jwt expired" || customError.message === "Unauthorized")) {
            isSignOutInProgress = true;
            await signOut({
                callbackUrl: "/auth/login",
            });
        }
    
        return Promise.reject(customError);
    }
    return Promise.reject(error);
});

export type {CustomSession}
export default instance;