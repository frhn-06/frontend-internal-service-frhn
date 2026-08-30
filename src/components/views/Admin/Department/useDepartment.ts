import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/configs/tableConfig";
import useDebaunce from "@/hooks/useDebaunce";
import DepartmentService from "@/services/department.service";
import { useQuery } from "@tanstack/react-query";
import {  useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

const useDepartment = () => {
    const {debaunce} = useDebaunce();

    const useParams = useSearchParams();
    const route = useRouter();

    const page = useParams.get("page");
    const limit = useParams.get("limit");
    const search= useParams.get("search");

    
    const setUrl = () => {
        const params = new URLSearchParams(useParams.toString());

        params.set("page", page || PAGE_DEFAULT.toString()); 
        params.set("limit", limit || LIMIT_DEFAULT.toString()); 
        params.set("search", search || ""); 
        
        route.replace(`?${params.toString()}`);
    }

    const getDepartments = async () => {
        let params = `page=${page}&limit=${limit}`;
        if(search) params += `&search=${search}`;
        
        const {data} = await DepartmentService.findAll(params);   
        return data;
    }


    const {
        data: dataDepartments,
        isLoading: isLoadingDepartments,
        isRefetching: isRefetchingDepartments,
        refetch: refetchDepartments,
        isError: isErrorDepartments,
        error: errorDepartments
    } = useQuery({
        queryKey: ["DepartmentsAdmin", page, limit, search],
        queryFn: getDepartments,
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
    
    return {
        page,
        limit,
        search,

        setUrl,

        dataDepartments,
        isLoadingDepartments,
        isRefetchingDepartments,
        refetchDepartments,
        isErrorDepartments,
        errorDepartments,

        handlePage,
        handleLimit,
        handleSearch,
        handleClearSearch
    }
}


export default useDepartment