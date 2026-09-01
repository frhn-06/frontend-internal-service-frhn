import { useToaster } from "@/contexts/toasterContext";
import EmployeeService from "@/services/employee.service";
import { useMutation } from "@tanstack/react-query";

const useChangeStatus = (id:string) => {
    const {setToaster} = useToaster();

    const ChangeStatus= async () => {
        const {data} = await EmployeeService.status(id);
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
                message: "Berhasil mengubah status employee"
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