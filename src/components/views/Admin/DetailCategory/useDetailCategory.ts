import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useToaster } from "@/contexts/toasterContext";
import schemaCategory from "./validation";
import DepartmentService from "@/services/department.service";
import CategoryService from "@/services/category.service";
import { ICategoryForm } from "@/types/category";

const useDetailCategory = () => {
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
        queryKey: ["SelectDepartmentsCategoryFormUpdate"],
        queryFn: SelectDepartment,
    });




    const getCategory = async () => {
        const {data} = await CategoryService.findOne(`${id}`);
        return data.data;
    }

    const {
        data: dataCategory, 
        isLoading: isLoadingCategory,
        refetch: refetchCategory,
        isRefetching: isRefetchingCategory,
        isError: isErrorCategory,
        error: errorCategory
    } = useQuery({
        queryKey: ["DetailCategory", params],
        queryFn: getCategory,
        enabled: !!params.id
    });





    const {
        control,
        handleSubmit,
        formState: {errors},
        setError,
        reset
    } = useForm({
        resolver: yupResolver(schemaCategory),
    })
                                    
    const UpdateCategory = async (payload: ICategoryForm) => {
        const {data} = await CategoryService.update(`${id}`, payload);
        return data.data;
    }
                                    
    const {
        mutate: mutateUpdateCategory,
        isPending: isPendingUpdateCategory,
        isSuccess: isSuccessUpdateCategory
    } = useMutation({
        mutationFn: (payload: ICategoryForm) => UpdateCategory(payload),
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
                message: "Berhasil mengupdate data category"
            });
            reset();
        }
    })
                                    
    const onUpdateCategory = (payload: ICategoryForm) => {
        const data = {
            name: payload.name,
            departmentId: Number(payload.departmentId),
            ...(payload.description && payload.description.trim() !== "" && {
                description: payload.description
            })
        }
        mutateUpdateCategory(data);
    }


    
    
    return {

        dataSelectDepartments,

        dataCategory,
        isLoadingCategory,
        refetchCategory,
        isRefetchingCategory,
        isErrorCategory,
        errorCategory,

        control,
        handleSubmit,
        errors,
        reset,

        isPendingUpdateCategory,
        isSuccessUpdateCategory,

        onUpdateCategory
    }
}

export default useDetailCategory;