"use client"

import ButtonFlat from "@/components/ui/Button/ButtonFlat";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import { Input, Form,Label, Modal, Surface, TextField, useOverlayState, Select, ListBox } from "@heroui/react";
import useAddAgent from "./useAddAgent";
import { Controller } from "react-hook-form";
import {  useEffect } from "react";
import { IDepartment } from "@/types/department";
import { Eye, EyeOff } from "lucide-react";

interface TypeProps {
  refetch: () => void;
}

const AddAgent = (props: TypeProps) => {
  const {
    refetch
  } = props;

  const {
    disabled,
    handleDisabled,
    
    dataSelectDepartments,

    control,
    handleSubmit,
    errors,
    reset,

    isPendingAddAgent,
    isSuccessAddAgent,

    onAddAgent
  } = useAddAgent();

  const state = useOverlayState();

  useEffect(() => {
    if (!state.isOpen) {
      reset();
    }
  }, [state.isOpen]);

  useEffect(() => {
    if(isSuccessAddAgent) {
      state.close();
      refetch();
    }
  }, [isSuccessAddAgent])

  


  return (
    <Modal state={state}>
      <ButtonSolid>
        Add Agent
      </ButtonSolid>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>
                Tambah Agent
              </Modal.Heading>

              <p className="mt-1.5 text-sm leading-5 text-muted">
                Buat akun agent baru dan tentukan departemen tempat agent bertugas menangani tiket.
              </p>
            </Modal.Header>
            <Form className="mt-2" onSubmit={handleSubmit(onAddAgent)}>
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
                        Nama Lengkap
                      </Label>
                      <Controller control={control} name="name" render={({field}) => (
                        <Input 
                          {...field}
                          placeholder="Masukkan nama lengkap agent"
                          className={errors?.name ? "ring-1 ring-red-500" : ""} 
                        />
                      )} />
                      {errors?.name && (
                        <p className="text-red-500 text-sm mt-1">
                        {errors?.name.message}
                      </p>
                      )}
                    </TextField>

                    <TextField className="w-full" name="email" type="text" variant="secondary">
                      <Label>
                        Email
                      </Label>
                      <Controller control={control} name="email" render={({field}) => (
                        <Input 
                          {...field}
                          placeholder="Masukkan email aktif agent"
                          className={errors?.email ? "ring-1 ring-red-500" : ""} 
                        />
                      )} />
                      {errors?.email && (
                        <p className="text-red-500 text-sm mt-1">
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

                    <TextField 
                      name="password" 
                      type={disabled ? "password" : "text"} 
                    >
                      <Label>
                        Password
                      </Label>
                      <div className="relative">
                      <Controller 
                        name="password" 
                        control={control} 
                          render={({field}) => (
                            <Input {...field} 
                              placeholder="Buat password untuk akun agent" 
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
                </Surface>
              </Modal.Body>

              <Modal.Footer>
                <ButtonFlat slot="close" onPress={reset} isDisabled={isPendingAddAgent}>
                  Cancel
                </ButtonFlat>
                <ButtonSolid type="submit" isDisabled={isPendingAddAgent}>
                  {isPendingAddAgent ? "Saving..." : "Save"}
                </ButtonSolid>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default AddAgent;
                   