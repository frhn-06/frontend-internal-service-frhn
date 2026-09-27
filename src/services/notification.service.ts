import instance from "@/libs/axios";
import endpoint from "./endpoint";

const NotificationService = {
    findAll: () => instance.get(`${endpoint.NOTIFICATION}`),

    countAll : () => instance.get(`${endpoint.NOTIFICATION}/count-all`),

    countAllMessage : () => instance.get(`${endpoint.NOTIFICATION}/count-all-message`),

    countAllMessageByTicket : () => instance.get(`${endpoint.NOTIFICATION}/count-message-by-ticket`),

    readNotifications: (id: string) => instance.patch(`${endpoint.NOTIFICATION}/${id}/read`),

    readNotificationMessages: (ticketId: string) => instance.patch(`${endpoint.NOTIFICATION}/${ticketId}/read-message`),

    removeById: (id: string) => instance.delete(`${endpoint.NOTIFICATION}/${id}/delete`),

    clear: () => instance.delete(`${endpoint.NOTIFICATION}/delete-all`),

    markAll: () => instance.patch(`${endpoint.NOTIFICATION}/mark-all/mark-all`)
}

export default NotificationService