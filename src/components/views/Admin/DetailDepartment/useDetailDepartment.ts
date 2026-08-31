import DepartmentService from "@/services/department.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { schemaDepartment } from "./validation";
import { useToaster } from "@/contexts/toasterContext";
import { IDepartmentForm } from "@/types/department";

const useDetailDepartment = () => {
    const params = useParams();
    const id = params.id;

    const {setToaster} = useToaster();

    const getDepartment = async () => {
        const {data} = await DepartmentService.findOne(`${id}`);
        return data.data;
    }

    const {
        data: dataDepartment, 
        isLoading: isLoadingDepartment,
        refetch: refetchDepartment,
        isRefetching: isRefetchingDepartment,
        isError: isErrorDepartment,
        error: errorDepartment
    } = useQuery({
        queryKey: ["DetailDepartment", params],
        queryFn: getDepartment,
        enabled: !!params.id
    });





    const {
        control,
        handleSubmit,
        formState: {errors},
        setError,
        reset
    } = useForm({
        resolver: yupResolver(schemaDepartment),
    })
                                    
    const UpdateDepartment = async (payload: IDepartmentForm) => {
        const {data} = await DepartmentService.update(`${id}`, payload);
        return data.data;
    }
                                    
    const {
        mutate: mutateUpdateDepartment,
        isPending: isPendingUpdateDepartment,
        isSuccess: isSuccessUpdateDepartment
    } = useMutation({
        mutationFn: (payload: IDepartmentForm) => UpdateDepartment(payload),
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
                message: "Berhasil mengupdate data department"
            });
            reset();
        }
    })
                                    
    const onUpdateDepartment = (payload: IDepartmentForm) => {
        mutateUpdateDepartment(payload);
    }


    
    
    return {
        dataDepartment,
        isLoadingDepartment,
        refetchDepartment,
        isRefetchingDepartment,
        isErrorDepartment,
        errorDepartment,

        control,
        handleSubmit,
        errors,
        reset,

        isPendingUpdateDepartment,
        isSuccessUpdateDepartment,

        onUpdateDepartment
    }
}

export default useDetailDepartment;