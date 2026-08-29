import instance from "@/libs/axios";
import endpoint from "./endpoint";
import { IUser } from "@/types/user";

const AgentService = {
    create: (data: IUser) => instance.post(`${endpoint.AGENT}`, data),

    findAll: (params: string) => instance.get(`${endpoint.AGENT}?${params}`),

    findOne: (id: string) => instance.get(`${endpoint.AGENT}/${id}`),

    update: (id:string, data: IUser) => instance.patch(`${endpoint.AGENT}/${id}`, data),

    delete: (id: string) => instance.delete(`${endpoint.AGENT}/${id}`)
}

export default AgentService;