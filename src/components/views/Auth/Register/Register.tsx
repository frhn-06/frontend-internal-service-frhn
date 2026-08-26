"use client";
import { Card, Form, Input, Label, Link, TextField } from "@heroui/react";
import { Controller } from "react-hook-form";
import useRegister from "./useRegister";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import { Eye, EyeOff } from "lucide-react";

const Register = () => { 
  const {
    disabled,
    handleDisable,

    handleSubmit,
    errors,
    control,

    isPending,
    isSuccess,

    onRegister
  } = useRegister();



  return (
    <div className="flex flex-col lg:flex-row items-centers w-full min-h-screen">
      <div className="bg-background-element w-full lg:w-1/2 h-64 lg:h-auto flex items-center justify-center">

      </div>





      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <Card.Header>
            <Card.Title className="text-2xl font-bold">
              Register
            </Card.Title>
            <Card.Description className="text-sm text-gray-500">
              Buat akun baru untuk mengakses aplikasi internal service.
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

                <TextField 
                  name="email" 
                  type="text"
                >
                  <Label>Email</Label>
                  <Controller 
                    name="email" 
                    control={control} 
                    render={({field}) => (
                      <Input {...field} 
                        placeholder="Agus@gmail.com" 
                        variant="secondary"
                        className={errors?.email ? "ring-1 ring-red-500" : ""}
                      />
                    )}
                  />
                  {errors?.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.email.message}
                    </p>
                  )}
                </TextField>

                <TextField 
                  name="name" 
                  type="text"
                >
                  <Label>Name</Label>
                  <Controller 
                    name="name" 
                    control={control} 
                    render={({field}) => (
                      <Input {...field} 
                        placeholder="Agus Setiawan" 
                        variant="secondary"
                        className={errors?.name ? "ring-1 ring-red-500" : ""}
                      />
                    )}
                  />
                  {errors?.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.name.message}
                    </p>
                  )}
                </TextField>

                <TextField 
                  name="password" 
                  type={disabled.password ? "password" : "text"} 
                >
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


                <TextField 
                  name="confirmPassword" 
                  type={disabled.confirmPassword ? "password" : "text"} 
                >
                  <Label>Confirm Password</Label>
                  <div className="relative">
                  <Controller 
                    name="confirmPassword" 
                    control={control} 
                      render={({field}) => (
                        <Input {...field} 
                          placeholder="****"
                          variant="secondary"
                          fullWidth
                          className={errors?.confirmPassword ? "ring-1 ring-red-500" : ""}
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
                {isPending ? "Mendaftar..." : "Daftar"}
              </ButtonSolid>

              <p className="text-center text-sm">
                Sudah punya akun? 
                <Link href="/auth/login" className="text-text-element font-semibold">
                  Login
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