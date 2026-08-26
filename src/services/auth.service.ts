import { ILoginForm, IRegisterForm } from "@/types/user";
import endpoint from "./endpoint";
import instance from "@/libs/axios";

const AuthService = {
    register: (data: IRegisterForm) => instance.post(`${endpoint.AUTH}/register`, data),

    login: (data: ILoginForm) => instance.post(`${endpoint.AUTH}/login`, data),

    getMe: (token: string) => instance.get(`${endpoint.AUTH}/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default AuthService;