import TicketService from "@/services/ticket.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { IMessageForm } from "@/types/message";
import { useToaster } from "@/contexts/toasterContext";
import { schemaMessageValidation } from "./validation";
import AiService from "@/services/ai.service";

const useMessage = () => {    
    console.log("render messages")
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
        queryKey: ["MessagesAgent", id],
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
        queryKey: ["TicketMessageAgent", id],
        queryFn: getTicket,
        enabled: !!id
    });
    
    const {
        handleSubmit,
        control,
        formState: {errors},
        reset,
        setValue
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
        isSuccess : isSuccessCreateMessage
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




    const generateAi = async () => {
        const {data} = await AiService.generate(`${dataTicketMessage.id}`);
        return data.data
    }

    const {
        mutate: mutateGenerateAi,
        isPending: isPendingGenerateAi,
        isSuccess: isSuccessGenerateAi
    } = useMutation({
        mutationFn: generateAi,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: (data) => {
            setToaster({
                type: "success",
                message: "Generate AI berhasil"
            })
            setValue("content" , data.reply);
        }
    })


    const onMessage = (data: IMessageForm) => {
        mutateCreateMessage(data);
    }


    const onGenerate = () => {
        mutateGenerateAi();
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
        isPendingCreateMessage,
        isSuccessCreateMessage,

        onGenerate,
        isPendingGenerateAi,
        isSuccessGenerateAi
    }
}

export default useMessage;