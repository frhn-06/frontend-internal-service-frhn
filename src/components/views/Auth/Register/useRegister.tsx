import { yupResolver } from "@hookform/resolvers/yup"
import registerValidationSchema from "./validation"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { IRegisterForm } from "@/types/user";
import AuthService from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useToaster } from "@/contexts/toasterContext";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const useRegister = () => {
    const {setToaster} = useToaster();

    const router = useRouter();


    const [disabled, setDisabled] = useState({
        password: true,
        confirmPassword: true,
    });


    const handleDisable = (field: "password" | "confirmPassword") => {
        setDisabled((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    }

    const { 
        handleSubmit, 
        control,
        formState: { errors },
        setError,
        reset
    } = useForm({
        resolver: yupResolver(registerValidationSchema),
    })



    const Register = async (payload: IRegisterForm) => {
        const {data} = await AuthService.register(payload);
        if(data.data) {
            return payload;
        }
    }

    const handleLoginAfterRegister = async (user:IRegisterForm) => {
        const resultLogin = await signIn("credentials", {
            identifier: user?.email,
            password: user?.password,
            redirect: false,
        });

        if(resultLogin?.error) {
            setToaster({
                type: "success",
                message: "Silahkan login dengan akun yg sudah terdaftar"
            });
            router.push("/auth/login");
             reset();
            return
        }
        setToaster({
            type: "success",
            message: `Pendaftaran Berhasil. Selamat Datang ${user?.name}`
        })
        reset();
        console.log("ok")
        router.push("/")
    }

    const { mutate, isPending, isSuccess} = useMutation({
        mutationFn: (payload: IRegisterForm) => Register(payload),
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
        onSuccess: async (payload) => {
            await handleLoginAfterRegister(payload as IRegisterForm)
        }
    })


    const onRegister = (data: IRegisterForm) => {
        mutate(data);
    }




    return {
        disabled,
        handleDisable,

        handleSubmit,
        errors,
        control,

        mutate,
        isPending,
        isSuccess,

        onRegister
    } 

}


export default useRegister;