"use client"

import { useEffect } from "react";
import useDetailAgent from "./useDetailAgent";
import { Card, Form, Input, Label, TextField , Skeleton, Breadcrumbs, Select, ListBox} from "@heroui/react";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import { Controller } from "react-hook-form";
import { IDepartment } from "@/types/department";

const DetailAgent = () => {
  const {
    dataSelectDepartments,
    
    dataAgent,
    isLoadingAgent,
    refetchAgent,
    isRefetchingAgent,
    isErrorAgent,
    errorAgent,

    control,
    handleSubmit,
    errors,
    reset,

    isPendingUpdateAgent,
    isSuccessUpdateAgent,

    onUpdateAgent
  } = useDetailAgent();


  useEffect(( ) => {
    if(dataAgent) {
      reset({
        name: dataAgent.name,
        email: dataAgent.email,
        departmentId: dataAgent.departmentId,
      })
    }
  },[dataAgent]);

  useEffect(() => {
    if(isSuccessUpdateAgent) {
      refetchAgent();
    }
  }, [isSuccessUpdateAgent])
  
  return (
    <div className="px-2 py-6 lg:px-6 lg:py-12">
      <Breadcrumbs className="mb-6">
        <Breadcrumbs.Item href="/admin/dashboard">
          Dashboard
        </Breadcrumbs.Item>
        <Breadcrumbs.Item href="/admin/agent">
          Agents
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          {dataAgent?.name}
        </Breadcrumbs.Item>
      </Breadcrumbs>

      {isErrorAgent ? (
        <div>
          {errorAgent?.message}
        </div>
      ) : isLoadingAgent || isRefetchingAgent ? (
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
              <div className="flex flex-col gap-1">
                <Skeleton animationType="shimmer" className="h-5 rounded-xl w-20" />

                <Skeleton animationType="shimmer" className="h-7 rounded-xl" />
              </div>
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
              Detail Agent
            </h1>
            <p className="text-text-abu ">
              Lihat dan perbarui informasi akun serta penempatan departemen agent.
            </p>
          </Card.Header>

          <Form onSubmit={handleSubmit(onUpdateAgent)}>
            <Card.Content>
              <div className="flex flex-col gap-4">
                {errors?.root && (
                  <p className="text-red-500 text-sm">
                    {errors?.root.message}
                  </p>
                )}

                <TextField name="name" type="text">
                  <Label>
                    Nama Lengkap
                  </Label>
                  <Controller control={control} name="name" render={({field}) => (
                    <Input 
                      {...field}
                      placeholder="Masukkan nama lengkap agent" 
                      variant="secondary"
                      className={errors?.name ? "ring-1 ring-red-500" : ""} 
                    />
                  )} />
                  {errors?.name && (
                    <p className="text-red-500 mt-1 text-sm">
                      {errors?.name.message}
                    </p>
                  )}
                </TextField>

                <TextField name="email" type="email">
                  <Label>
                    Email
                  </Label>
                  <Controller control={control} name="email" render={({field}) => (
                    <Input 
                      {...field}
                      placeholder="Masukkan email aktif agent" 
                      variant="secondary"
                      className={errors?.email ? "ring-1 ring-red-500" : ""} 
                    />
                  )} />
                  {errors?.email && (
                    <p className="text-red-500 mt-1 text-sm">
                      {errors?.email.message}
                    </p>
                  )}
                </TextField>


                <TextField className="w-full" name="departmentId" type="text" variant="secondary">
                  <Label>
                    Departemen
                  </Label>
                  <Controller control={control} name="departmentId" render={({field}) => (
                    <Select
                      aria-label="Department"
                      name={field.name}
                      className={`w-[256px] ${errors?.departmentId && "ring-1 ring-red-500 rounded-xl"}`}
                      placeholder="Pilih departemen agent"
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          {dataSelectDepartments?.map((department: IDepartment) => (
                            <ListBox.Item 
                              key={department.id} 
                              id={department.id} 
                              textValue={department.name}
                              className="cursor-pointer"
                            >
                              {department.name}
                
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  )} />
                  {errors?.departmentId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.departmentId.message}
                    </p>
                  )}
                </TextField>
              </div>
            </Card.Content>

            <Card.Footer className="mt-4 flex justify-end gap-2">
              <ButtonSolid type="submit" isDisabled={isPendingUpdateAgent}>
                {isPendingUpdateAgent ? "Saving..." : "Save"}
              </ButtonSolid>
            </Card.Footer>
          </Form>
        </Card>

      )}
    </div>
  )
}

export default DetailAgent;