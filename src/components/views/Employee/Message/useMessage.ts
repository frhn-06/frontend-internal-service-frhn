import TicketService from "@/services/ticket.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { schemaMessageValidation } from "./validation";
import { IMessageForm } from "@/types/message";
import { useToaster } from "@/contexts/toasterContext";
import NotificationService from "@/services/notification.service";

const useMessage = () => {    
    console.log("render message")
    const params = useParams();
    const id = params.id;

    const {setToaster} = useToaster();

    const queryClient = useQueryClient();


    const getMessages = async () => {
        const {data} = await TicketService.findManyMessage(`${id}`);
        return data.data;
    }
    
    const {
        data: dataMessages,
        isLoading: isLoadingMessages,
        isError: isErrorMessages,
        error: errorMessages,
        refetch: refetchMessage,
        isSuccess: isSuccessMessages
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
        mutate: mutateCreateMessage,
        isPending: isPendingCreateMessage,
        isSuccess: isSuccessCreateMessage
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



    const readNotifMessage = async () => {
        const {data} = await NotificationService.readNotificationMessages(`${dataTicketMessage.id}`);
        return data.data
    }

    const {
        mutate: mutateReadNotifMessage,
        isSuccess: isSuccessReadNotifMessage
    } = useMutation({
        mutationFn: () => readNotifMessage().then(() => {
            queryClient.invalidateQueries({
                queryKey: ["count-notification-messages"]
            })
        }),
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message
            })
        },
    })


    const onMessage = (data: IMessageForm) => {
        mutateCreateMessage(data);
    }


    const onReadMessage = () => {
        mutateReadNotifMessage();
    }
    
    
    return {
        dataMessages,
        isLoadingMessages,
        isErrorMessages,
        errorMessages,
        refetchMessage,
        isSuccessMessages,

        dataTicketMessage,
        isLoadingTicketMessage,
        isErrorTicketMessage,

        handleSubmit,
        control,
        errors,


        onMessage,
        isPendingCreateMessage,
        isSuccessCreateMessage,

        onReadMessage,
        isSuccessReadNotifMessage
    }
}

export default useMessage;