import { useToaster } from "@/contexts/toasterContext";
import NotificationService from "@/services/notification.service";
import TicketService from "@/services/ticket.service";
import { useMutation, useQuery } from "@tanstack/react-query";

const useInfoTicket = (id: string) => {
    const {setToaster} = useToaster();
    

    const ChangeStatusNextProgress = async () => {
       const {data} = await TicketService.nextProgress(`${id}`);
       return data.data
    }

    const ChangeStatusAwait = async () => {
       const {data} = await TicketService.wait(`${id}`);
       return data.data
    }

    const ChangeStatusResolve = async () => {
       const {data} = await TicketService.resolve(`${id}`);
       return data.data
    }


    const {
        mutate: mutateChangeStatusNextProgress,
        isPending: isPendingChangeStatusNextProgress,
        isSuccess: isSuccessChangeStatusNextProgress,
        isError: isErrorChangeStatusNextProgress
    } = useMutation({
        mutationFn: ChangeStatusNextProgress,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil mengubah status ticket menjadi progress"
            });
        }
    })

    const {
        mutate: mutateChangeStatusAwait,
        isPending: isPendingChangeStatusAwait,
        isSuccess: isSuccessChangeStatusAwait,
        isError: isErrorChangeStatusAwait
    } = useMutation({
        mutationFn: ChangeStatusAwait,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil mengubah status ticket menjadi waiting"
            });
        }
    })

    const {
        mutate: mutateChangeStatusResolve,
        isPending: isPendingChangeStatusResolve,
        isSuccess: isSuccessChangeStatusResolve,
        isError: isErrorChangeStatusResolve
    } = useMutation({
        mutationFn: ChangeStatusResolve,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil mengubah status ticket menjadi selesai"
            });
        }
    })


    const onnextProgress = () => {
        mutateChangeStatusNextProgress()
    }

    const onAwait = () => {
        mutateChangeStatusAwait()
    }

    const onResolve = () => {
        mutateChangeStatusResolve()
    }



    const getCountNotifMessagesByTicket = async() => {
        const {data} = await NotificationService.countAllMessageByTicket();
        return data.data;
    }
    
    const {
        data: dataCountNotifMessagesByTicket,
        refetch: refetchCountNotifMessagesByTicket
    } = useQuery({
        queryKey: ["count-notification-messages-by-ticket-in-detail"],
        queryFn: getCountNotifMessagesByTicket
    })





    return {

        mutateChangeStatusNextProgress,
        isPendingChangeStatusNextProgress,
        isSuccessChangeStatusNextProgress,
        isErrorChangeStatusNextProgress,
        
        mutateChangeStatusAwait,
        isPendingChangeStatusAwait,
        isSuccessChangeStatusAwait,
        isErrorChangeStatusAwait,

        mutateChangeStatusResolve,
        isPendingChangeStatusResolve,
        isSuccessChangeStatusResolve,
        isErrorChangeStatusResolve,

        onnextProgress,
        onAwait,
        onResolve,

        dataCountNotifMessagesByTicket,
        refetchCountNotifMessagesByTicket
    }
}


export default useInfoTicket;