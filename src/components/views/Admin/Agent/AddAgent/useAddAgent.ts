import { useToaster } from "@/contexts/toasterContext";
import DepartmentService from "@/services/department.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import schemaAgent from "./validation";
import AgentService from "@/services/agent.service";
import { IAgentForm } from "@/types/agent";
import { useState } from "react";

const useAddAgent = () => {
    const { setToaster } = useToaster();


    const [disabled, setDisabled] = useState(true);

    const handleDisabled = () => {
        setDisabled(!disabled);
    }



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




    const {
        control,
        handleSubmit,
        formState: {errors},
        setError,
        reset
    } = useForm({
        resolver: yupResolver(schemaAgent),
        defaultValues: {
            name: "",
            email: "",
            departmentId: "",
            password: ""
        }
    })

    const CreateAgent = async (payload: IAgentForm) => {
        const {data} = await AgentService.create(payload);
        return data.data;
    }

    const {
        mutate: mutateAddAgent,
        isPending: isPendingAddAgent,
        isSuccess: isSuccessAddAgent
    } = useMutation({
        mutationFn: (payload: IAgentForm) => CreateAgent(payload),
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
                message: "Berhasil membuat agent"
            });
            reset();
        }
    })

    const onAddAgent = (payload: IAgentForm) => {
        const data = {
            ...payload,
            departmentId: Number(payload.departmentId)
        }
        mutateAddAgent(data);
    }
    

    return {
        disabled,
        handleDisabled,

        dataSelectDepartments,

        control,
        handleSubmit,
        errors,
        setError,
        reset,

        isPendingAddAgent,
        isSuccessAddAgent,
        onAddAgent
    }
}

export default useAddAgent;