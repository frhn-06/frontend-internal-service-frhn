import { useToaster } from "@/contexts/toasterContext";
import DepartmentService from "@/services/department.service"
import { useMutation } from "@tanstack/react-query";

const useDeleteDepartment = (id:string) => {
    const {setToaster} = useToaster();

    const DeleteDepartment= async () => {
        const {data} = await DepartmentService.delete(id);
        return data.data
    }

    const {
        mutate: mutateDeleteDepartment,
        isPending: isPendingDeleteDepartment,
        isSuccess: isSuccessDeleteDepartment,
        isError: isErrorDeleteDepartment
    } = useMutation({
        mutationFn: DeleteDepartment,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil menghapus department"
            });
        }
    })

    const onDeleteDepartment = () => {
        mutateDeleteDepartment();
    }

    return {
        isPendingDeleteDepartment,
        isSuccessDeleteDepartment,
        onDeleteDepartment,
        isErrorDeleteDepartment
    }
}

export default useDeleteDepartment;