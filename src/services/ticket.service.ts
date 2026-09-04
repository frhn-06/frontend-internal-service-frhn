import instance from "@/libs/axios";
import { ITicketForm } from "@/types/ticket";
import endpoint from "./endpoint";

const TicketService = {
    create: (payload: ITicketForm) => instance.post(`${endpoint.TICKET}`, payload),

    findByRole: (params: string) => instance.get(`${endpoint.TICKET}?${params}`),

    findByDepartment: (params: string) => instance.get(`${endpoint.TICKET}/find/department?${params}`),

    findOne: (id: string) => instance.get(`${endpoint.TICKET}/${id}`),

    take: (id: string) => instance.patch(`${endpoint.TICKET}/${id}/take`),

    wait: (id: string) => instance.patch(`${endpoint.TICKET}/${id}/wait`),

    resolve: (id: string) => instance.patch(`${endpoint.TICKET}/${id}/resolve`),

    reProgress: (id: string) => instance.patch(`${endpoint.TICKET}/${id}/re_progress`),

    reOpen: (id: string) => instance.patch(`${endpoint.TICKET}/${id}/re_open`),

    close: (id: string) => instance.patch(`${endpoint.TICKET}/${id}/close`),

    cancel: (id: string) => instance.patch(`${endpoint.TICKET}/${id}/cancel`),
}


export default TicketService;