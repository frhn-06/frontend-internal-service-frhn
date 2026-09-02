import { useToaster } from "@/contexts/toasterContext";
import DepartmentService from "@/services/department.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ICategoryForm } from "@/types/category";
import CategoryService from "@/services/category.service";
import schemaCategoryValidation from "./validation";

const useAddCategory = () => {
    const { setToaster } = useToaster();



    const SelectDepartment = async () => {
        const params = `limit=100`;
        const {data} = await DepartmentService.findAll(params);   
        return data.data;
    }


    const {
        data: dataSelectDepartments,
    } = useQuery({
        queryKey: ["SelectDepartmentsCategoryForm"],
        queryFn: SelectDepartment,
    });




    const {
        control,
        handleSubmit,
        formState: {errors},
        setError,
        reset
    } = useForm({
        resolver: yupResolver(schemaCategoryValidation),
        defaultValues: {
            name: "",
            departmentId: "",
        }
    })

    const CreateCategory = async (payload: ICategoryForm) => {
        const {data} = await CategoryService.create(payload);
        return data.data;
    }

    const {
        mutate: mutateAddCategory,
        isPending: isPendingAddCategory,
        isSuccess: isSuccessAddCategory
    } = useMutation({
        mutationFn: (payload: ICategoryForm) => CreateCategory(payload),
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
                message: "Berhasil membuat category"
            });
            reset();
        }
    })

    const onAddCategory = (payload: ICategoryForm) => {
        const data = {
            name: payload.name,
            departmentId: Number(payload.departmentId),
            ...(payload.description && payload.description.trim() !== "" && {
                description: payload.description
            })
        }
        mutateAddCategory(data);
    }
    

    return {
        dataSelectDepartments,

        control,
        handleSubmit,
        errors,
        setError,
        reset,

        isPendingAddCategory,
        isSuccessAddCategory,
        onAddCategory
    }
}

export default useAddCategory;