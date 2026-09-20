import NotificationService from "@/services/notification.service"
import { useMutation, useQuery } from "@tanstack/react-query";

const useHeader = () => {
    
    const getNotifications = async() => {
        const {data} = await NotificationService.findAll();
        return data.data;
    }

    const {
        data: dataNotifications,
        refetch: refetchDataNotifications
    } = useQuery({
        queryKey: ["list-notifications"],
        queryFn: getNotifications
    })


    const getCountNotifications = async() => {
        const {data} = await NotificationService.countAll();
        return data.data;
    }

    const {
        data: dataCountNotifications,
        refetch: refetchCountNotifications,

    } = useQuery({
        queryKey: ["count-notifications"],
        queryFn: getCountNotifications,
        placeholderData: (previousData) => previousData
    })

    const getCountNotifMessages = async() => {
        const {data} = await NotificationService.countAllMessage();
        return data.data;
    }

    const {
        data: dataCountNotifMessages,
        refetch: refetchCountNotifMessages,
    } = useQuery({
        queryKey: ["count-notification-messages"],
        queryFn: getCountNotifMessages,
        placeholderData: (previousData) => previousData
    })


    const readNotification = async (id: string) => {
        const {data} = await NotificationService.readNotifications(id);
        return data.data
    }
    
    const {
        mutate: mutateReadNotification,
        isSuccess: isSuccessReadNotification,
    } = useMutation({
        mutationFn: (id: string) => readNotification(id),
    })
    
    const onReadNotification = (id: string) => {
        mutateReadNotification(id);
    }
    
    

    
    return {
        dataNotifications,
        refetchDataNotifications,
        
        dataCountNotifications,
        refetchCountNotifications,

        dataCountNotifMessages,
        refetchCountNotifMessages,

        onReadNotification,
        isSuccessReadNotification
    }
}

export default useHeader