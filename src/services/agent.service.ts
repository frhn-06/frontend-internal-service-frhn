import instance from "@/libs/axios";
import endpoint from "./endpoint";
import { IAgentForm } from "@/types/agent";

const AgentService = {
    create: (data: IAgentForm) => instance.post(`${endpoint.AGENT}`, data),

    findAll: (params: string) => instance.get(`${endpoint.AGENT}?${params}`),

    findOne: (id: string) => instance.get(`${endpoint.AGENT}/${id}`),

    update: (id:string, data: IAgentForm) => instance.patch(`${endpoint.AGENT}/${id}`, data),

    delete: (id: string) => instance.delete(`${endpoint.AGENT}/${id}`),

    status: (id: string) => instance.patch(`${endpoint.AGENT}/${id}/status`),
}

export default AgentService;