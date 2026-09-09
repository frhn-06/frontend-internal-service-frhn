import instance from "@/libs/axios";
import { ITicketForm } from "@/types/ticket";
import endpoint from "./endpoint";
import { IMessageForm } from "@/types/message";

const TicketService = {
    create: (payload: ITicketForm) => instance.post(`${endpoint.TICKET}`, payload),

    findByRole: (params: string) => instance.get(`${endpoint.TICKET}?${params}`),

    findByDepartment: (params: string) => instance.get(`${endpoint.TICKET}/find/department?${params}`),

    findOne: (id: string) => instance.get(`${endpoint.TICKET}/${id}`),

    take: (id: string) => instance.patch(`${endpoint.TICKET}/${id}/take`),

    wait: (id: string) => instance.patch(`${endpoint.TICKET}/${id}/wait`),

    resolve: (id: string) => instance.patch(`${endpoint.TICKET}/${id}/resolve`),

    nextProgress: (id: string) => instance.patch(`${endpoint.TICKET}/${id}/next_progress`),

    reProgress: (id: string) => instance.patch(`${endpoint.TICKET}/${id}/re_progress`),

    close: (id: string) => instance.patch(`${endpoint.TICKET}/${id}/close`),

    cancel: (id: string) => instance.patch(`${endpoint.TICKET}/${id}/cancel`),




    sendMessage: (id: string, data: IMessageForm) => instance.post(`${endpoint.TICKET}/${id}/message`, data),

    findManyMessage: (id: string) => instance.get(`${endpoint.TICKET}/${id}/message`)
}


export default TicketService;