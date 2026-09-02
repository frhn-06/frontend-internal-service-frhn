import { useToaster } from "@/contexts/toasterContext";
import CategoryService from "@/services/category.service";
import { useMutation } from "@tanstack/react-query";

const useChangeStatus = (id:string) => {
    const {setToaster} = useToaster();

    const ChangeStatus= async () => {
        const {data} = await CategoryService.status(id);
        return data.data
    }

    const {
        mutate: mutateChangeStatus,
        isPending: isPendingChangeStatus,
        isSuccess: isSuccessChangeStatus,
        isError: isErrorChangeStatus
    } = useMutation({
        mutationFn: ChangeStatus,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil mengubah status category"
            });
        }
    })

    const onChangeStatus = () => {
        mutateChangeStatus();
    }

    return {
        isPendingChangeStatus,
        isSuccessChangeStatus,
        onChangeStatus,
        isErrorChangeStatus
    }
}

export default useChangeStatus;