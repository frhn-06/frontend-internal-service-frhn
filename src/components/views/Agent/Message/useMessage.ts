import TicketService from "@/services/ticket.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { IMessageForm } from "@/types/message";
import { useToaster } from "@/contexts/toasterContext";
import { schemaMessageValidation } from "./validation";
import AiService from "@/services/ai.service";
import NotificationService from "@/services/notification.service";

const useMessage = () => {    
    console.log("render messages")
    const params = useParams();
    const id = params.id;

    const {setToaster} = useToaster();

    const queryClient = useQueryClient();


    const getMessages = async (pageParam: number) => {
        const {data} = await TicketService.findManyMessageWithPagination(`${id}`, `page=${pageParam}&limit=25`);
        return data.data;
    }
    

    const {
        data: dataMessages,
        isLoading: isLoadingMessages,
        isError: isErrorMessages,
        error: errorMessages,
        refetch: refetchMessage,
        isSuccess: isSuccessMessages,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["MessagesAgent", id],
        queryFn: ({ pageParam = 1 }) => getMessages(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
        },
        enabled: !!id
    });


    const duplikateMessage = dataMessages?.pages.slice();
    const reverseMessage = duplikateMessage?.reverse();
    const messages = reverseMessage?.flatMap(page => page.data) || [];

    
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


    const onGenerate = () => {
        mutateGenerateAi();
    }


    const onReadMessages = () => {
        mutateReadNotifMessage();
    }
    
    
    return {
        dataMessages,
        isLoadingMessages,
        isErrorMessages,
        errorMessages,
        refetchMessage,
        isSuccessMessages,

        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,

        messages,

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
        isSuccessGenerateAi,

        onReadMessages,
        isSuccessReadNotifMessage
    }
}

export default useMessage;