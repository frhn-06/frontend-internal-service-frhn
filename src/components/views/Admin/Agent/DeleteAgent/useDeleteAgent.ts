import { useToaster } from "@/contexts/toasterContext";
import AgentService from "@/services/agent.service";
import { useMutation } from "@tanstack/react-query";

const useDeleteAgent = (id:string) => {
    const {setToaster} = useToaster();

    const DeleteAgent= async () => {
        const {data} = await AgentService.delete(id);
        return data.data
    }

    const {
        mutate: mutateDeleteAgent,
        isPending: isPendingDeleteAgent,
        isSuccess: isSuccessDeleteAgent,
        isError: isErrorDeleteAgent
    } = useMutation({
        mutationFn: DeleteAgent,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil menghapus agent"
            });
        }
    })

    const onDeleteAgent = () => {
        mutateDeleteAgent();
    }

    return {
        isPendingDeleteAgent,
        isSuccessDeleteAgent,
        onDeleteAgent,
        isErrorDeleteAgent
    }
}

export default useDeleteAgent;