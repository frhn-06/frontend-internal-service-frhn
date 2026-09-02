import { LIMIT_CATEGORY_DEFAULT, PAGE_DEFAULT, STATUS_CATEGORY_DEFAULT } from "@/configs/tableConfig";
import useDebaunce from "@/hooks/useDebaunce";
import CategoryService from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import {  useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

const useCategory = () => {
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
        params.set("limit", limit || LIMIT_CATEGORY_DEFAULT.toString());
        params.set("active", active || STATUS_CATEGORY_DEFAULT.toString());
        params.set("search", search || ""); 
        
        route.replace(`?${params.toString()}`);
    }

    const getCategory = async () => {
        let params = `page=${page}&limit=${limit}`;
        if(search) params += `&search=${search}`;
        if(active) params += `&active=${active}`;
        
        const {data} = await CategoryService.findAll(params);   
        return data;
    }


    const {
        data: dataCategories,
        isLoading: isLoadingCategories,
        isRefetching: isRefetchingCategories,
        refetch: refetchCategories,
        isError: isErrorCategories,
        error: errorCategories
    } = useQuery({
        queryKey: ["CategoriesAdmin", page, limit, active, search],
        queryFn: getCategory,
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
            params.set("active", STATUS_CATEGORY_DEFAULT.toString())   
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

        dataCategories,
        isLoadingCategories,
        isRefetchingCategories,
        refetchCategories,
        isErrorCategories,
        errorCategories,

        handlePage,
        handleLimit,
        handleSearch,
        handleClearSearch,
        handleStatus
    }
}


export default useCategory