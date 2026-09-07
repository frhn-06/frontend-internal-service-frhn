import { useToaster } from "@/contexts/toasterContext";
import TicketService from "@/services/ticket.service";
import { useMutation } from "@tanstack/react-query";

const useInfoMyTicket = (id: string) => {
    const {setToaster} = useToaster();
    
    const ChangeStatusReProgress = async () => {
       const {data} = await TicketService.reProgress(`${id}`);
       return data.data
    }

    const ChangeStatusClose = async () => {
       const {data} = await TicketService.close(`${id}`);
       return data.data
    }

    const ChangeStatusCancel = async () => {
       const {data} = await TicketService.cancel(`${id}`);
       return data.data
    }


    const {
        mutate: mutateChangeStatusReProgress,
        isPending: isPendingChangeStatusReProgress,
        isSuccess: isSuccessChangeStatusReProgress,
        isError: isErrorChangeStatusReProgress
    } = useMutation({
        mutationFn: ChangeStatusReProgress,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil mengubah kembali status ticket menjadi in progres"
            });
        }
    })
    
    const {
        mutate: mutateChangeStatusClose,
        isPending: isPendingChangeStatusClose,
        isSuccess: isSuccessChangeStatusClose,
        isError: isErrorChangeStatusClose
    } = useMutation({
        mutationFn: ChangeStatusClose,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil mengubah status ticket menjadi closed"
            });
        }
    })

    const {
        mutate: mutateChangeStatusCancel,
        isPending: isPendingChangeStatusCancel,
        isSuccess: isSuccessChangeStatusCancel,
        isError: isErrorChangeStatusCancel
    } = useMutation({
        mutationFn: ChangeStatusCancel,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil mengubah status ticket menjadi cancelled"
            });
        }
    })


    const onReProgress = () => {
        mutateChangeStatusReProgress()
    }

    const onClose = () => {
        mutateChangeStatusClose()
    }

    const onCancel = () => {
        mutateChangeStatusCancel()
    }


    return {
        mutateChangeStatusReProgress,
        isPendingChangeStatusReProgress,
        isSuccessChangeStatusReProgress,
        isErrorChangeStatusReProgress,

        mutateChangeStatusClose,
        isPendingChangeStatusClose,
        isSuccessChangeStatusClose,
        isErrorChangeStatusClose,

        mutateChangeStatusCancel,
        isPendingChangeStatusCancel,
        isSuccessChangeStatusCancel,
        isErrorChangeStatusCancel,

        onReProgress,
        onClose,
        onCancel
    }
}


export default useInfoMyTicket;