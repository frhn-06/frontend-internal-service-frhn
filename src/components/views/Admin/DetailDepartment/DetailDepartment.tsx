"use client"

import { useEffect } from "react";
import useDetailDepartment from "./useDetailDepartment";
import { Card, Form, Input, Label, TextField , Skeleton, Breadcrumbs} from "@heroui/react";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import { Controller } from "react-hook-form";

const DetailDepartment = () => {
  const {
    dataDepartment,
    isLoadingDepartment,
    refetchDepartment,
    isRefetchingDepartment,
    isErrorDepartment,
    errorDepartment,

    control,
    handleSubmit,
    errors,
    reset,

    isPendingUpdateDepartment,
    isSuccessUpdateDepartment,

    onUpdateDepartment
  } = useDetailDepartment();


  useEffect(( ) => {
    if(dataDepartment) {
      reset({
        name: dataDepartment.name
      })
    }
  },[dataDepartment]);

  useEffect(() => {
    if(isSuccessUpdateDepartment) {
      refetchDepartment();
    }
  }, [isSuccessUpdateDepartment])
  
  return (
    <div>
      <Breadcrumbs className="mb-6">
        <Breadcrumbs.Item href="/admin/dashboard">
          Dashboard
        </Breadcrumbs.Item>
        <Breadcrumbs.Item href="/admin/department">
          Departments
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          {dataDepartment?.name}
        </Breadcrumbs.Item>
      </Breadcrumbs>

      {isErrorDepartment ? (
        <div>
          {errorDepartment?.message}
        </div>
      ) : isLoadingDepartment || isRefetchingDepartment ? (
        <Card className="w-full max-w-xl">
          <Card.Header className="gap-1">
            <Skeleton animationType="shimmer" className="h-10 rounded-xl w-1/2" />
           
            <Skeleton animationType="shimmer" className="h-7 rounded-xl" />           
          </Card.Header>
          
          <Card.Content>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Skeleton animationType="shimmer" className="h-5 rounded-xl w-20" />

                <Skeleton animationType="shimmer" className="h-7 rounded-xl" />
              </div>
            </div>
          </Card.Content>

          <Card.Footer className="mt-4 flex justify-end gap-2">
            <Skeleton animationType="shimmer" className="h-9 rounded-2xl w-20" />
          </Card.Footer>
        </Card>
      ) : (

        <Card className="w-full max-w-xl">
          <Card.Header>
            <h1 className="text-2xl font-bold text-foreground">
              Edit Department
            </h1>
            <p className="text-text-abu ">
              description
            </p>
          </Card.Header>

          <Form onSubmit={handleSubmit(onUpdateDepartment)}>
            <Card.Content>
              <div className="flex flex-col gap-4">
                {errors?.root && (
                  <p className="text-red-500 text-sm">
                    {errors?.root.message}
                  </p>
                )}

                <TextField name="name" type="text">
                  <Label>Nama</Label>
                  <Controller control={control} name="name" render={({field}) => (
                    <Input 
                      {...field}
                      placeholder="Contoh: Department Finance" 
                      variant="secondary"
                      className={errors?.name ? "ring-1 ring-red-500" : ""} 
                    />
                  )} />
                  {errors?.name && (
                    <p className="text-red-500 mt-1 text-sm">
                      {errors?.name.message}
                      asu
                    </p>
                  )}
                </TextField>
              </div>
            </Card.Content>

            <Card.Footer className="mt-4 flex justify-end gap-2">
              <ButtonSolid type="submit" isDisabled={isPendingUpdateDepartment}>
                {isPendingUpdateDepartment ? "Menyimpan..." : "Simpan"}
              </ButtonSolid>
            </Card.Footer>
          </Form>
        </Card>

      )}
    </div>
  )
}

export default DetailDepartment;