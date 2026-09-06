import { useToaster } from "@/contexts/toasterContext";
import TicketService from "@/services/ticket.service";
import { useMutation } from "@tanstack/react-query";

const useTakeTicket = (id: string) => {
    const {setToaster} = useToaster();
    
    
    const TakeTicket = async () => {
       const {data} = await TicketService.take(`${id}`);
       return data.data
    }


   

    const {
        mutate: mutateTakeTicket,
        isPending: isPendingTakeTicket,
        isSuccess: isSuccessTakeTicket,
        isError: isErrorTakeTicket
    } = useMutation({
        mutationFn: TakeTicket,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil mengambil ticket ini"
            });
        }
    })



    const onTake = () => {
        mutateTakeTicket()
    }


    return {

        mutateTakeTicket,
        isPendingTakeTicket,
        isSuccessTakeTicket,
        isErrorTakeTicket,

       
        onTake
    }
}


export default useTakeTicket;