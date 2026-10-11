import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import loginValidationSchema from "./validation";
import { ILoginForm } from "@/types/user";
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useToaster } from "@/contexts/toasterContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

const useLogin = () => {
    const {setToaster} = useToaster();

    const router = useRouter();

    const [disabled, setDisabled] = useState(true);

    const handleDisabled = () => {
        setDisabled(!disabled);
    }

    const {
        handleSubmit, 
        control,
        formState: {errors},
        setError,
        reset
    } = useForm({
        resolver: yupResolver(loginValidationSchema)
    });


    const Login = async (payload: ILoginForm) => {
        const result = await signIn("credentials", {
            identifier: payload.identifier,
            password: payload.password,
            redirect: false,
        });

        if (result?.error) {
            throw new Error("Nama atau email atau password tidak sesuai");
        }

        router.refresh();
        return result;
    }

    const { mutate, isPending, isSuccess} = useMutation({
        mutationFn: (payload: ILoginForm) => Login(payload),
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
                message: "Berhasil masuk"
            });
            reset();
        }
    })

    const onLogin = (data: ILoginForm) => {
        mutate(data);
    }
    
    return {
        disabled,
        handleDisabled,

        handleSubmit,
        errors,
        control,

        isPending,
        isSuccess,

        onLogin
    }
}

export default useLogin;