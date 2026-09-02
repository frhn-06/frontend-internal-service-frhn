"use client"

import ButtonFlat from "@/components/ui/Button/ButtonFlat";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import { Input, Form,Label, Modal, Surface, TextField, useOverlayState, Select, ListBox, TextArea } from "@heroui/react";
import useAddCategory from "./useAddCategory";
import { Controller } from "react-hook-form";
import {  useEffect } from "react";
import { IDepartment } from "@/types/department";

interface TypeProps {
  refetch: () => void;
}

const AddCategory = (props: TypeProps) => {
  const {
    refetch
  } = props;

  const {
    dataSelectDepartments,

    control,
    handleSubmit,
    errors,
    reset,

    isPendingAddCategory,
    isSuccessAddCategory,

    onAddCategory
  } = useAddCategory();

  const state = useOverlayState();

  useEffect(() => {
    if (!state.isOpen) {
      reset();
    }
  }, [state.isOpen]);

  useEffect(() => {
    if(isSuccessAddCategory) {
      state.close();
      refetch();
    }
  }, [isSuccessAddCategory])

  


  return (
    <Modal state={state}>
      <ButtonSolid>
        Tambah Category
      </ButtonSolid>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>
                Buat Category
              </Modal.Heading>

              <p className="mt-1.5 text-sm leading-5 text-muted">
                description
              </p>
            </Modal.Header>
            <Form className="mt-2" onSubmit={handleSubmit(onAddCategory)}>
              <Modal.Body>
                <Surface variant="default">
                  <div className="flex flex-col gap-4">
                    {errors?.root && (
                      <p className="text-red-500 text-sm">
                        {errors?.root.message}
                      </p>
                    )}

                    <TextField className="w-full" name="name" type="text" variant="secondary">
                      <Label>
                        Name
                      </Label>
                      <Controller control={control} name="name" render={({field}) => (
                        <Input 
                          {...field}
                          placeholder="Contoh: Internate & Networking"
                          className={errors?.name ? "ring-1 ring-red-500" : ""} 
                        />
                      )} />
                      {errors?.name && (
                        <p className="text-red-500 text-sm mt-1">
                        {errors?.name.message}
                      </p>
                      )}
                    </TextField>

                    <TextField className="w-full" name="departmentId" type="text" variant="secondary">
                      <Label>
                        Department
                      </Label>
                      <Controller control={control} name="departmentId" render={({field}) => (
                        <Select
                        aria-label="Department"
                        name={field.name}
                        className={`w-[256px] ${errors?.departmentId && "ring-1 ring-red-500 rounded-xl"}`}
                        placeholder="Pilih department"
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

                    <TextField className="w-full" name="description" type="text" variant="secondary">
                      <Label>
                        Description
                      </Label>
                      <Controller control={control} name="description" render={({field}) => (
                        <TextArea 
                          {...field}
                          placeholder="Isi deskripsi disini"
                          className={errors?.description ? "ring-1 ring-red-500" : ""} 
                        />
                      )} />
                      {errors?.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors?.description.message}
                        </p>
                      )}
                    </TextField>
                          

                  </div>
                </Surface>
              </Modal.Body>

              <Modal.Footer>
                <ButtonFlat slot="close" onPress={reset} isDisabled={isPendingAddCategory}>
                  Kembali
                </ButtonFlat>
                <ButtonSolid type="submit" isDisabled={isPendingAddCategory}>
                  {isPendingAddCategory ? "Menyimpan..." : "Simpan"}
                </ButtonSolid>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default AddCategory;
                   