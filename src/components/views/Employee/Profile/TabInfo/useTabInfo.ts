import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import schemaProfile from "./validation";
import { IUpdateProfileForm } from "@/types/user";
import UserService from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useToaster } from "@/contexts/toasterContext";

const useTabInfo = () => {
    const {setToaster} = useToaster();

    const {
        control: controlUpdateProfile,
        handleSubmit: handleSubmitUpdateProfile,
        setError: setErrorUpdateProfile,
        formState: {
            errors: errorsUpdateProfile
        },
        reset: resetUpdateProfile
    } = useForm({
        resolver: yupResolver(schemaProfile)
    })

    const updateProfile = async (payload: IUpdateProfileForm) => {
        const {data} = await UserService.updateProfile(payload);
        return data.data;
    }

    const {
        mutate: mutateUpdateProfile,
        isPending: isPendingUpdateProfile,
        isSuccess: isSuccessUpdateProfile,
    } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            if(error.message === "jwt expired" || error.message === "Unauthorized") {
                signOut();
                return
            }
            setErrorUpdateProfile("root", {
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
                message: "Berhasil mengubah profile"
            })
        }
    })

    const onUpdateProfile = (payload: IUpdateProfileForm) => {
        mutateUpdateProfile(payload);
    }


    return {
        controlUpdateProfile,
        handleSubmitUpdateProfile,
        setErrorUpdateProfile,
        errorsUpdateProfile,
        resetUpdateProfile,

        isPendingUpdateProfile,
        isSuccessUpdateProfile,

        onUpdateProfile
    }
}

export default useTabInfo