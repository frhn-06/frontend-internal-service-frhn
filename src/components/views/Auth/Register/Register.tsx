"use client";
import { Card, Form, Input, Label, Link, TextField } from "@heroui/react";
import { Controller } from "react-hook-form";
import useRegister from "./useRegister";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image"
import cn from "@/utils/cn";

const Register = () => { 
  const {
    disabled,
    handleDisable,

    handleSubmit,
    errors,
    control,

    isPending,

    onRegister
  } = useRegister();



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
          Get Started!
        </h3>
      
        <h1 className="text-white font-light text-lg lg:text-xl">
          HelpDesk - Internal Service
        </h1>
      
        <p className="text-white font-light">
          Buat akun dan kelola kebutuhan layanan internal dengan lebih mudah.
        </p>
      </div>





      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md shadow-lg shadow-text-element/40">
          <Card.Header>
            <Card.Title className="text-xl lg:text-2xl font-bold mb-2 text-text-element">
              Create Account
            </Card.Title>
            <Card.Description className="text-sm text-gray-500">
              Daftar untuk mulai menggunakan Internal Service.
            </Card.Description>
          </Card.Header>


          <Form onSubmit={handleSubmit(onRegister)}>
            <Card.Content>
              <div className="flex flex-col gap-4">

                {errors?.root && (
                  <p className="text-red-500 text-sm">
                    {errors?.root.message}
                  </p>
                )}

                <TextField name="name" type="text">
                  <Label className="text-sm lg:text-base">Nama Lengkap</Label>
                  <Controller 
                    name="name" 
                    control={control} 
                    render={({field}) => (
                      <Input {...field} 
                        placeholder="Masukkan nama lengkap" 
                        variant="secondary"
                        className={cn("text-sm lg:text-base", errors?.name ? "ring-1 ring-red-500" : "")}
                      />
                    )}
                  />
                  {errors?.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.name.message}
                    </p>
                  )}
                </TextField>

                <TextField name="email" type="text">
                  <Label className="text-sm lg:text-base">Email</Label>
                  <Controller 
                    name="email" 
                    control={control} 
                    render={({field}) => (
                      <Input {...field} 
                        placeholder="Masukkan email aktif" 
                        variant="secondary"
                        className={cn("text-sm lg:text-base", errors?.email ? "ring-1 ring-red-500" : "")}
                      />
                    )}
                  />
                  {errors?.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.email.message}
                    </p>
                  )}
                </TextField>

                <TextField name="password" type={disabled.password ? "password" : "text"} >
                  <Label className="text-sm lg:text-base">Password</Label>
                  <div className="relative">
                  <Controller 
                    name="password" 
                    control={control} 
                      render={({field}) => (
                        <Input {...field} 
                          placeholder="Buat password"
                          variant="secondary"
                          fullWidth
                          className={cn("text-sm lg:text-base", errors?.password ? "ring-1 ring-red-500" : "")}
                        />
                      )} 
                  />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => handleDisable("password")}
                    >
                      {disabled.password ? <Eye color="green" /> : <EyeOff color="green" />}
                    </button>
                  </div>
                  {errors?.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.password.message}
                    </p>
                  )}
                </TextField>


                <TextField name="confirmPassword" type={disabled.confirmPassword ? "password" : "text"} >
                  <Label className="text-sm lg:text-base">Konfirmasi Password</Label>
                  <div className="relative">
                  <Controller 
                    name="confirmPassword" 
                    control={control} 
                      render={({field}) => (
                        <Input {...field} 
                          placeholder="Konfirmasi password"
                          variant="secondary"
                          fullWidth
                          className={cn("text-sm lg:text-base", errors?.confirmPassword ? "ring-1 ring-red-500" : "")}
                        />
                      )} 
                  />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => handleDisable("confirmPassword")}
                    >
                      {disabled.password ? <Eye color="green" /> : <EyeOff color="green" />}
                    </button>
                  </div>
                  {errors?.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.confirmPassword.message}
                    </p>
                  )}
                </TextField>
                
                
                
              </div>
            </Card.Content>


            <Card.Footer className="mt-4 flex flex-col gap-2">
              <ButtonSolid type="submit" fullWidth isDisabled={isPending}>
                {isPending ? "Memuat..." : "Create Account"}
              </ButtonSolid>

              <p className="text-center text-sm">
                Sudah punya akun? <Link href="/auth/login" className="text-text-element font-semibold">
                  Sign In
                </Link>
              </p>
            </Card.Footer>
          </Form>

          
        </Card>
      </div>
    </div>
  );
};

export default Register;