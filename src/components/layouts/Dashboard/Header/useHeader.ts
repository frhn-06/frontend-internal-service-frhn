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
        refetch: refetchCountNotifications
    } = useQuery({
        queryKey: ["count-notifications"],
        queryFn: getCountNotifications
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

        onReadNotification,
        isSuccessReadNotification
    }
}

export default useHeader