import { useForm } from "react-hook-form";
import { schemaDepartment } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { IDepartmentForm } from "@/types/department";
import DepartmentService from "@/services/department.service";
import { useMutation } from "@tanstack/react-query";
import { useToaster } from "@/contexts/toasterContext";

const useAddDepartment = () => {
    const { setToaster } = useToaster();

    const {
        control,
        handleSubmit,
        formState: {errors},
        setError,
        reset
    } = useForm({
        resolver: yupResolver(schemaDepartment),
        defaultValues: {
            name: ""
        }
    })

    const CreateDepartment = async (payload: IDepartmentForm) => {
        const {data} = await DepartmentService.create(payload);
        return data.data;
    }

    const {
        mutate: mutateAddDepartment,
        isPending: isPendingAddDepartment,
        isSuccess: isSuccessAddDepartment
    } = useMutation({
        mutationFn: (payload: IDepartmentForm) => CreateDepartment(payload),
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
                message: "Berhasil membuat departments"
            });
            reset();
        }
    })

    const onAddDepartment = (payload: IDepartmentForm) => {
        mutateAddDepartment(payload);
    }

    return {
        control,
        handleSubmit,
        errors,
        reset,

        isPendingAddDepartment,
        isSuccessAddDepartment,

        onAddDepartment
    }
}

export default useAddDepartment;