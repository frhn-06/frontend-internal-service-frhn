import { LIMIT_DEFAULT, listPriorityTickets, listStatusTickets, PAGE_DEFAULT, PRIORITY_TICKET_DEFAULT, STATUS_TICKET_DEFAULT } from "@/configs/tableConfig";
import useDebaunce from "@/hooks/useDebaunce";
import NotificationService from "@/services/notification.service";
import TicketService from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import {  useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

const useTicket = () => {
    console.log("render my ticket")
    const {debaunce} = useDebaunce();

    const useParams = useSearchParams();
    const route = useRouter();

    const page = useParams.get("page");
    const limit = useParams.get("limit");
    const status = useParams.get("status");
    const priority = useParams.get("priority");
    const search= useParams.get("search");

    
    const setUrl = () => {
        const params = new URLSearchParams(useParams.toString());

        params.set("page", page || PAGE_DEFAULT.toString()); 
        params.set("limit", limit || LIMIT_DEFAULT.toString());
        params.set("status", status || STATUS_TICKET_DEFAULT.toString());
        params.set("priority", priority || PRIORITY_TICKET_DEFAULT.toString());
        params.set("search", search || ""); 
        
        route.replace(`?${params.toString()}`);
    }

    const getTickets = async () => {
        let params = `page=${page}&limit=${limit}`;
        if(search) params += `&search=${search}`;
        if(status) params += `&status=${status}`;
        if(priority) params += `&priority=${priority}`;
        
        const {data} = await TicketService.findByRole(params);   
        return data;
    }


    const {
        data: dataTickets,
        isLoading: isLoadingTickets,
        isRefetching: isRefetchingTickets,
        refetch: refetchTickets,
        isError: isErrorTickets,
        error: errorTickets
    } = useQuery({
        queryKey: ["MyTicketsEmployee", page, limit, status, priority, search],
        queryFn: getTickets,
        enabled: !!page && !!limit,
        retry: false,
    });



    const getCountNotifMessagesByTicket = async() => {
        const {data} = await NotificationService.countAllMessageByTicket();
        return data.data;
    }
    
    const {
        data: dataCountNotifMessagesByTicket,
        refetch: refetchCountNotifMessagesByTicket,
        isSuccess: isSuccessCountNotifMessagesByTicket
    } = useQuery({
        queryKey: ["count-notification-messages-by-ticket-employee"],
        queryFn: getCountNotifMessagesByTicket
    })



    const handlePage = (e: number) => {
        const params = new URLSearchParams(useParams.toString()); 

        params.set("page", e.toString()); 
        
        route.push(`?${params.toString()}`);
    }

    const handleLimit = (value: string) => {
        const params = new URLSearchParams(useParams.toString()); 

        params.set("page", PAGE_DEFAULT.toString());
        params.set("limit", value); 
        
        route.push(`?${params.toString()}`);
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        debaunce(() => {
            const params = new URLSearchParams(useParams.toString()); 

            params.set("page", PAGE_DEFAULT.toString());
            params.set("search", e.target.value); 
            
            route.push(`?${params.toString()}`);
        }, 800)
    }

    const handleClearSearch = () => {
        const params = new URLSearchParams(useParams.toString()); 

        params.set("page", PAGE_DEFAULT.toString());
        params.set("search", ""); 
        
        route.push(`?${params.toString()}`);
    }

    const handleStatus = (value: string) => {
        const params = new URLSearchParams(useParams.toString());

        params.set("page", PAGE_DEFAULT.toString());
        if(!listStatusTickets.map((l) => l.id).includes(value)) {
            params.set("status", STATUS_TICKET_DEFAULT.toString())   
        } else {
            params.set("status", value)
        }
        route.push(`?${params.toString()}`);
    }

    const handlePriority = (value: string) => {
        const params = new URLSearchParams(useParams.toString());

        params.set("page", PAGE_DEFAULT.toString());
        if(!listPriorityTickets.map((l) => l.id).includes(value)) {
            params.set("priority", PRIORITY_TICKET_DEFAULT.toString())   
        } else {
            params.set("priority", value)
        }

        route.push(`?${params.toString()}`);
    }
    
    return {
        page,
        limit,
        search,
        status,
        priority,

        setUrl,

        dataTickets,
        isLoadingTickets,
        isRefetchingTickets,
        refetchTickets,
        isErrorTickets,
        errorTickets,

        dataCountNotifMessagesByTicket,
        refetchCountNotifMessagesByTicket,
        isSuccessCountNotifMessagesByTicket,

        handlePage,
        handleLimit,
        handleSearch,
        handleClearSearch,
        handleStatus,
        handlePriority
    }
}


export default useTicket