"use client"

import { Card, Form, Input, Label, TextField } from "@heroui/react";
import useLogin from "./useLogin";
import { Controller } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import Link from "next/link";
import Image from "next/image"

const Login = () => {
  const {
    disabled,
    handleDisabled,

    handleSubmit,
    errors,
    control,

    isPending,
    onLogin
  } = useLogin();

  return (
    <div className="flex flex-col lg:flex-row items-centers w-full min-h-screen">
      <div className="bg-background-element w-full lg:w-1/2 h-fit lg:h-auto flex flex-col justify-center py-12 px-8 gap-2">
        <div className="w-24">
          <Image 
            src={'/images/logo/logo-app-2.png'} 
            alt="logo" 
            height={720} 
            width={720} 
            className="w-full" 
          />
        </div>

        <h3 className="text-white font-semibold text-xl lg:text-2xl">
          Welcome Back!
        </h3>

        <h1 className="text-white font-light text-lg lg:text-xl">
          HelpDesk - Internal Service
        </h1>

        <p className="text-white font-light">
          Satu tempat untuk kebutuhan dan layanan internalmu.
        </p>
      </div>
                      
                      
                      
                      
                      
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md shadow-lg shadow-text-element/40">
          <Card.Header>
            <Card.Title className="text-2xl font-bold mb-2 text-text-element">
              Sign In
            </Card.Title>
            <Card.Description className="text-sm text-gray-500">
              Masuk ke akunmu untuk melanjutkan.
            </Card.Description>
          </Card.Header>
                      
                      
          <Form onSubmit={handleSubmit(onLogin)}>
            <Card.Content>
              <div className="flex flex-col gap-4">
                      
                {errors?.root && (
                  <p className="text-red-500 text-sm">
                    {errors?.root.message}
                  </p>
                )}
                      
                <TextField name="email" type="text">
                  <Label>Email / Name</Label>
                  <Controller 
                    name="identifier" 
                    control={control} 
                    render={({field}) => (
                      <Input {...field} 
                        placeholder="Agus@gmail.com / Agus" 
                        variant="secondary"
                        className={errors?.identifier ? "ring-1 ring-red-500" : ""}
                      />
                    )}
                  />
                  {errors?.identifier && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.identifier.message}
                    </p>
                  )}
                </TextField>
                          
                <TextField name="password" type={disabled ? "password" : "text"}>
                  <Label>Password</Label>
                  <div className="relative">
                  <Controller 
                    name="password" 
                    control={control} 
                      render={({field}) => (
                        <Input {...field} 
                          placeholder="****" 
                          variant="secondary"
                          fullWidth
                          className={errors?.password ? "ring-1 ring-red-500" : ""}
                        />
                      )} 
                  />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={handleDisabled}
                    >
                      {disabled ? <Eye color="green" /> : <EyeOff color="green" /> }
                    </button>
                  </div>
                  {errors?.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.password.message}
                    </p>
                  )}
                </TextField>
                  
              </div>
            </Card.Content>
                      
                      
            <Card.Footer className="mt-4 flex flex-col gap-2">
              <ButtonSolid type="submit" fullWidth isDisabled={isPending}>
                {isPending ? "Memuat..." : "Sign In"}
              </ButtonSolid>
                      
              <p className="text-center text-sm">
                Belum punya akun? <Link href="/auth/register" className="text-text-element font-semibold">
                  Register
                </Link>
              </p>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default Login;