import { useToaster } from "@/contexts/toasterContext";
import TicketService from "@/services/ticket.service";
import { useMutation } from "@tanstack/react-query";

const useInfoMyTicket = (id: string) => {
    const {setToaster} = useToaster();
    
    const ChangeStatusReOpen = async () => {
       const {data} = await TicketService.reOpen(`${id}`);
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
        mutate: mutateChangeStatusReOpen,
        isPending: isPendingChangeStatusReOpen,
        isSuccess: isSuccessChangeStatusReOpen,
        isError: isErrorChangeStatusReOpen
    } = useMutation({
        mutationFn: ChangeStatusReOpen,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil mengubah status ticket menjadi in progres"
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
                message: "Berhasil mengubah status ticket menjadi closed"
            });
        }
    })


    const onReOpen = () => {
        mutateChangeStatusReOpen()
    }

    const onClose = () => {
        mutateChangeStatusClose()
    }

    const onCancel = () => {
        mutateChangeStatusCancel()
    }


    return {
        mutateChangeStatusReOpen,
        isPendingChangeStatusReOpen,
        isSuccessChangeStatusReOpen,
        isErrorChangeStatusReOpen,

        mutateChangeStatusClose,
        isPendingChangeStatusClose,
        isSuccessChangeStatusClose,
        isErrorChangeStatusClose,

        mutateChangeStatusCancel,
        isPendingChangeStatusCancel,
        isSuccessChangeStatusCancel,
        isErrorChangeStatusCancel,

        onReOpen,
        onClose,
        onCancel
    }
}


export default useInfoMyTicket;