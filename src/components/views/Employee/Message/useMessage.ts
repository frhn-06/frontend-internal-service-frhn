import TicketService from "@/services/ticket.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { schemaMessageValidation } from "./validation";
import { IMessageForm } from "@/types/message";
import { useToaster } from "@/contexts/toasterContext";

const useMessage = () => {    
    console.log("render message")
    const params = useParams();
    const id = params.id;

    const {setToaster} = useToaster();


    const getMessages = async () => {
        const {data} = await TicketService.findManyMessage(`${id}`);
        return data.data;
    }
    
    const {
        data: dataMessages,
        isLoading: isLoadingMessages,
        isError: isErrorMessages,
        error: errorMessages,
        refetch: refetchMessage
    } = useQuery({
        queryKey: ["MessagesEmployee", id],
        queryFn: getMessages,
        enabled: !!id
    });


    
    const getTicket = async () => {
        const {data} = await TicketService.findOne(`${id}`);
        return data.data;
    }
    
    const {
        data: dataTicketMessage, 
        isLoading: isLoadingTicketMessage,
        isError: isErrorTicketMessage,
    } = useQuery({
        queryKey: ["TicketMessage", id],
        queryFn: getTicket,
        enabled: !!id
    });
    
    
    const {
        handleSubmit,
        control,
        formState: {errors},
        reset
    } = useForm({
        resolver: yupResolver(schemaMessageValidation),
        defaultValues: {
            content: ""
        }
    });


    const createMessage = async (payload: IMessageForm) => {
        const {data} = await TicketService.sendMessage(`${id}`, payload);
        return data.data;
    }


    const  {
        mutate,
        isPending,
        isSuccess
    } = useMutation({
        mutationFn: (data: IMessageForm) => createMessage(data),
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            reset();
        }
    });


    const onMessage = (data: IMessageForm) => {
        mutate(data);
    }
    
    
    return {
        dataMessages,
        isLoadingMessages,
        isErrorMessages,
        errorMessages,
        refetchMessage,

        dataTicketMessage,
        isLoadingTicketMessage,
        isErrorTicketMessage,

        handleSubmit,
        control,
        errors,


        onMessage,
        isPending,
        isSuccess
    }
}

export default useMessage;