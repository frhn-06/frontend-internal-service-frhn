import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useToaster } from "@/contexts/toasterContext";
import { IUpdatePasswordForm } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import UserService from "@/services/user.service";
import { signOut } from "next-auth/react";
import schemaPassword from "./validation";

const useTabPassword = () => {
    const {setToaster} = useToaster();

    const {
        control: controlUpdatePassword,
        handleSubmit: handleSubmitUpdatePassword,
        setError: setErrorUpdatePassword,
        formState: {
            errors: errorsUpdatePassword
        },
        reset: resetUpdatePassword
    } = useForm({
        resolver: yupResolver(schemaPassword)
    })

    const UpdatePassword = async (payload: IUpdatePasswordForm) => {
        const {data} = await UserService.updatePassword(payload);
        return data.data;
    }

    const {
        mutate: mutateUpdatePassword,
        isPending: isPendingUpdatePassword,
        isSuccess: isSuccessUpdatePassword,
    } = useMutation({
        mutationFn: UpdatePassword,
        onError: (error) => {
            if(error.message === "jwt expired" || error.message === "Unauthorized") {
                signOut();
                return
            }
            setErrorUpdatePassword("root", {
                type: "server",
                message: error.message
            })
            setToaster({
                type: "error",
                message: error.message
            });
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil mengubah password"
            })
            resetUpdatePassword();
        }
    })

    const onUpdatePassword = (payload: IUpdatePasswordForm) => {
        mutateUpdatePassword(payload);
    }


    
    
    return {
        handleSubmitUpdatePassword,
        controlUpdatePassword,
        errorsUpdatePassword,
        resetUpdatePassword,

        isPendingUpdatePassword,
        isSuccessUpdatePassword,

        onUpdatePassword
    }
}


export default useTabPassword;