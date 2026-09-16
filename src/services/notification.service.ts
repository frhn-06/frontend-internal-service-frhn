import instance from "@/libs/axios";
import endpoint from "./endpoint";

const NotificationService = {
    findAll: () => instance.get(`${endpoint.NOTIFICATION}`),

    countAll : () => instance.get(`${endpoint.NOTIFICATION}/count-all`),

    readNotifications: (id: string) => instance.patch(`${endpoint.NOTIFICATION}/${id}`)
}

export default NotificationService