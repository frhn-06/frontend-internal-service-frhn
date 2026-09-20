import instance from "@/libs/axios";
import endpoint from "./endpoint";

const NotificationService = {
    findAll: () => instance.get(`${endpoint.NOTIFICATION}`),

    countAll : () => instance.get(`${endpoint.NOTIFICATION}/count-all`),

    countAllMessage : () => instance.get(`${endpoint.NOTIFICATION}/count-all-message`),

    countAllMessageByTicket : () => instance.get(`${endpoint.NOTIFICATION}/count-message-by-ticket`),

    readNotifications: (id: string) => instance.patch(`${endpoint.NOTIFICATION}/${id}`),

    readNotificationMessages: (ticketId: string) => instance.patch(`${endpoint.NOTIFICATION}/${ticketId}/message`)
}

export default NotificationService