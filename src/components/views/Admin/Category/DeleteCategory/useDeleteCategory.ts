import { useToaster } from "@/contexts/toasterContext";
import CategoryService from "@/services/category.service";
import { useMutation } from "@tanstack/react-query";

const useDeleteCategory = (id:string) => {
    const {setToaster} = useToaster();

    const DeleteCategory= async () => {
        const {data} = await CategoryService.delete(id);
        return data.data
    }

    const {
        mutate: mutateDeleteCategory,
        isPending: isPendingDeleteCategory,
        isSuccess: isSuccessDeleteCategory,
        isError: isErrorDeleteCategory
    } = useMutation({
        mutationFn: DeleteCategory,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil menghapus category"
            });
        }
    })

    const onDeleteCategory = () => {
        mutateDeleteCategory();
    }

    return {
        isPendingDeleteCategory,
        isSuccessDeleteCategory,
        onDeleteCategory,
        isErrorDeleteCategory
    }
}

export default useDeleteCategory;