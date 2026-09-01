import { LIMIT_DEFAULT, PAGE_DEFAULT, STATUS_AGENT_DEFAULT } from "@/configs/tableConfig";
import useDebaunce from "@/hooks/useDebaunce";
import AgentService from "@/services/agent.service";
import { useQuery } from "@tanstack/react-query";
import {  useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

const useAgent = () => {
    const {debaunce} = useDebaunce();

    const useParams = useSearchParams();
    const route = useRouter();

    const page = useParams.get("page");
    const limit = useParams.get("limit");
    const active = useParams.get("active");
    const search= useParams.get("search");

    
    const setUrl = () => {
        const params = new URLSearchParams(useParams.toString());

        params.set("page", page || PAGE_DEFAULT.toString()); 
        params.set("limit", limit || LIMIT_DEFAULT.toString());
        params.set("active", active || STATUS_AGENT_DEFAULT.toString());
        params.set("search", search || ""); 
        
        route.replace(`?${params.toString()}`);
    }

    const getAgent = async () => {
        let params = `page=${page}&limit=${limit}`;
        if(search) params += `&search=${search}`;
        if(active) params += `&active=${active}`;
        
        const {data} = await AgentService.findAll(params);   
        return data;
    }


    const {
        data: dataAgents,
        isLoading: isLoadingAgents,
        isRefetching: isRefetchingAgents,
        refetch: refetchAgents,
        isError: isErrorAgents,
        error: errorAgents
    } = useQuery({
        queryKey: ["AgentAdmin", page, limit, active, search],
        queryFn: getAgent,
        enabled: !!page && !!limit,
        retry: false,
    });






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
        if(value !== "true" && value !== "false") {
            params.set("active", STATUS_AGENT_DEFAULT.toString())   
        } else {
            params.set("active", value)
        }

        route.push(`?${params.toString()}`);
    }
    
    return {
        page,
        limit,
        search,
        active,

        setUrl,

        dataAgents,
        isLoadingAgents,
        isRefetchingAgents,
        refetchAgents,
        isErrorAgents,
        errorAgents,

        handlePage,
        handleLimit,
        handleSearch,
        handleClearSearch,
        handleStatus
    }
}


export default useAgent