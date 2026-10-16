"use client"

import { useEffect } from "react";
import useDetailCategory from "./useDetailCategory";
import { Card, Form, Input, Label, TextField , Skeleton, Breadcrumbs, Select, ListBox, TextArea} from "@heroui/react";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import { Controller } from "react-hook-form";
import { IDepartment } from "@/types/department";

const DetailCategory = () => {
  const {
    dataSelectDepartments,
    
    dataCategory,
    isLoadingCategory,
    refetchCategory,
    isRefetchingCategory,
    isErrorCategory,
    errorCategory,

    control,
    handleSubmit,
    errors,
    reset,

    isPendingUpdateCategory,
    isSuccessUpdateCategory,

    onUpdateCategory
  } = useDetailCategory();


  useEffect(( ) => {
    if(dataCategory) {
      reset({
        name: dataCategory.name,
        departmentId: dataCategory.departmentId,
        description: dataCategory.description ?? ""
      })
    }
  },[dataCategory]);

  useEffect(() => {
    if(isSuccessUpdateCategory) {
      refetchCategory();
    }
  }, [isSuccessUpdateCategory])
  
  return (
    <div className="px-2 py-6 lg:px-6 lg:py-12">
      <Breadcrumbs className="mb-6">
        <Breadcrumbs.Item href="/admin/dashboard">
          Dashboard
        </Breadcrumbs.Item>
        <Breadcrumbs.Item href="/admin/category">
          Categories
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          {dataCategory?.name}
        </Breadcrumbs.Item>
      </Breadcrumbs>

      {isErrorCategory ? (
        <div>
          {errorCategory?.message}
        </div>
      ) : isLoadingCategory || isRefetchingCategory ? (
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
              Detail Kategori Layanan
            </h1>
            <p className="text-text-abu ">
              Lihat dan perbarui informasi kategori serta departemen terkait.
            </p>
          </Card.Header>

          <Form onSubmit={handleSubmit(onUpdateCategory)}>
            <Card.Content>
              <div className="flex flex-col gap-4">
                {errors?.root && (
                  <p className="text-red-500 text-sm">
                    {errors?.root.message}
                  </p>
                )}

                <TextField name="name" type="text">
                  <Label>
                    Nama Kategori
                  </Label>
                  <Controller control={control} name="name" render={({field}) => (
                    <Input 
                      {...field}
                      placeholder="Contoh: Perbaikan Perangkat" 
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


                <TextField className="w-full" name="departmentId" type="text" variant="secondary">
                  <Label>
                    Departemen
                  </Label>
                  <Controller control={control} name="departmentId" render={({field}) => (
                    <Select
                      aria-label="Department"
                      name={field.name}
                      className={`w-[256px] ${errors?.departmentId && "ring-1 ring-red-500 rounded-xl"}`}
                      placeholder="Pilih departemen"
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


                <TextField name="descrption" type="text">
                  <Label>
                    Deskripsi
                  </Label>
                  <Controller control={control} name="description" render={({field}) => (
                    <TextArea 
                      {...field}
                      value={field.value ?? ""}
                      placeholder="Jelaskan kegunaan kategori ini" 
                      variant="secondary"
                      className={errors?.description ? "ring-1 ring-red-500" : ""} 
                    />
                  )} />
                  {errors?.description && (
                    <p className="text-red-500 mt-1 text-sm">
                      {errors?.description.message}
                    </p>
                  )}
                </TextField>
              </div>
            </Card.Content>

            <Card.Footer className="mt-4 flex justify-end gap-2">
              <ButtonSolid type="submit" isDisabled={isPendingUpdateCategory}>
                {isPendingUpdateCategory ? "Saving..." : "Save"}
              </ButtonSolid>
            </Card.Footer>
          </Form>
        </Card>

      )}
    </div>
  )
}

export default DetailCategory;