import instance from "@/libs/axios";
import endpoint from "./endpoint";
import { IMessageForm } from "@/types/message";

const MessageService = {
    create: (id: string, data: IMessageForm) => instance.post(`${endpoint.MESSAGE}/${id}`, data),

    findMany: (id: string) => instance.get(`${endpoint.MESSAGE}/${id}`)
}

export default MessageService;