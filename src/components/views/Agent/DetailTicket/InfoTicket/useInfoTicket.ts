import { useToaster } from "@/contexts/toasterContext";
import TicketService from "@/services/ticket.service";
import { useMutation } from "@tanstack/react-query";

const useInfoTicket = (id: string) => {
    const {setToaster} = useToaster();
    
    const ChangeStatusTake = async () => {
       const {data} = await TicketService.take(`${id}`);
       return data.data
    }

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
        mutate: mutateChangeStatusTake,
        isPending: isPendingChangeStatusTake,
        isSuccess: isSuccessChangeStatusTake,
        isError: isErrorChangeStatusTake
    } = useMutation({
        mutationFn: ChangeStatusTake,
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


    const onTake = () => {
        mutateChangeStatusTake()
    }

    const onnextProgress = () => {
        mutateChangeStatusNextProgress()
    }

    const onAwait = () => {
        mutateChangeStatusAwait()
    }

    const onResolve = () => {
        mutateChangeStatusResolve()
    }


    return {
        mutateChangeStatusTake,
        isPendingChangeStatusTake,
        isSuccessChangeStatusTake,
        isErrorChangeStatusTake,

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

        onTake,
        onnextProgress,
        onAwait,
        onResolve
    }
}


export default useInfoTicket;