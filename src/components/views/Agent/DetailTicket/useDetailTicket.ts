"use client"

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import TicketService from "@/services/ticket.service";

const useDetailTicket = () => {
    const params = useParams();
    const id = params.id;



    const getTicket = async () => {
        const {data} = await TicketService.findOne(`${id}`);
        return data.data;
    }

    const {
        data: dataDetailTicket, 
        isLoading: isLoadingDetailTicket,
        refetch: refetchDetailTicket,
        isRefetching: isRefetchingDetailTicket,
        isError: isErrorDetailTicket,
        error: errorDetailTicket
    } = useQuery({
        queryKey: ["DetailTicketAgent", id],
        queryFn: getTicket,
        enabled: !!id
    });



    
    
    return {
        dataDetailTicket,
        isLoadingDetailTicket,
        refetchDetailTicket,
        isRefetchingDetailTicket,
        isErrorDetailTicket,
        errorDetailTicket,

    }
}

export default useDetailTicket;