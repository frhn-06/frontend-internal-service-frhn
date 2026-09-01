import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useToaster } from "@/contexts/toasterContext";
import schemaAgent from "./validation";
import { IAgentForm } from "@/types/agent";
import AgentService from "@/services/agent.service";
import DepartmentService from "@/services/department.service";

const useDetailAgent = () => {
    const params = useParams();
    const id = params.id;

    const {setToaster} = useToaster();




    const SelectDepartment = async () => {
        const params = `limit=100`;
        const {data} = await DepartmentService.findAll(params);   
        return data.data;
    }


    const {
        data: dataSelectDepartments,
    } = useQuery({
        queryKey: ["SelectDepartments"],
        queryFn: SelectDepartment,
    });




    const getAgent = async () => {
        const {data} = await AgentService.findOne(`${id}`);
        return data.data;
    }

    const {
        data: dataAgent, 
        isLoading: isLoadingAgent,
        refetch: refetchAgent,
        isRefetching: isRefetchingAgent,
        isError: isErrorAgent,
        error: errorAgent
    } = useQuery({
        queryKey: ["DetailAgent", params],
        queryFn: getAgent,
        enabled: !!params.id
    });





    const {
        control,
        handleSubmit,
        formState: {errors},
        setError,
        reset
    } = useForm({
        resolver: yupResolver(schemaAgent),
    })
                                    
    const UpdateAgent = async (payload: IAgentForm) => {
        const {data} = await AgentService.update(`${id}`, payload);
        return data.data;
    }
                                    
    const {
        mutate: mutateUpdateAgent,
        isPending: isPendingUpdateAgent,
        isSuccess: isSuccessUpdateAgent
    } = useMutation({
        mutationFn: (payload: IAgentForm) => UpdateAgent(payload),
        onError: (error) => {
            setError("root", {
                type: "server",
                message: error.message
            });
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil mengupdate data agent"
            });
            reset();
        }
    })
                                    
    const onUpdateAgent = (payload: IAgentForm) => {
        const data = {
            ...payload,
            departmentId: Number(payload.departmentId)
        }
        mutateUpdateAgent(data);
    }


    
    
    return {

        dataSelectDepartments,

        dataAgent,
        isLoadingAgent,
        refetchAgent,
        isRefetchingAgent,
        isErrorAgent,
        errorAgent,

        control,
        handleSubmit,
        errors,
        reset,

        isPendingUpdateAgent,
        isSuccessUpdateAgent,

        onUpdateAgent
    }
}

export default useDetailAgent;