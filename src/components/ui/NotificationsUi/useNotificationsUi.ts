import { useToaster } from "@/contexts/toasterContext"
import NotificationService from "@/services/notification.service"
import { useMutation } from "@tanstack/react-query"

const useNotificationsUi = () => {

    const {setToaster} = useToaster();
    
    const deleteNotification = async(id: string) => {
        const {data} = await NotificationService.removeById(id);
        return data.data
    }
    
    const {
        mutate: mutateDeleteNotification,
        isSuccess: isSuccessDeleteNotification,
        isPending: isPendingDeleteNotification
    } = useMutation({
        mutationFn: (id: string) => deleteNotification(id),
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "berhasil menghapus notifikasi"
            })
        }
    })    
    
    const clearNotifications = async() => {
        const {data} = await NotificationService.clear();
        return data.data
    }
    
    const {
        mutate: mutateClearNotifications,
        isSuccess: isSuccessClearNotifications,
        isPending: isPendingClearNotifications
    } = useMutation({
        mutationFn: clearNotifications,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "berhasil menghapus semua notifikasi"
            })
        }
    })



    const markAllNotifications = async() => {
        const {data} = await NotificationService.markAll();
        return data.data
    }
    
    const {
        mutate: mutateMarkAllNotifications,
        isSuccess: isSuccessMarkAllNotifications,
        isPending: isPendingMarkAllNotifications
    } = useMutation({
        mutationFn: markAllNotifications,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "berhasil menandai semua notifikasi"
            })
        }
    })




    const onDeleteNotification = (id: string) => {
        mutateDeleteNotification(id);
    }

    const onClearNotifications = () => {
        mutateClearNotifications();
    }
    
    const onMarkAllNotifications = () => {
        mutateMarkAllNotifications();
    }

    return {
        onDeleteNotification,
        isSuccessDeleteNotification,
        isPendingDeleteNotification,


        onClearNotifications,
        isSuccessClearNotifications,
        isPendingClearNotifications,


        onMarkAllNotifications,
        isSuccessMarkAllNotifications,
        isPendingMarkAllNotifications
    }
}

export default useNotificationsUi