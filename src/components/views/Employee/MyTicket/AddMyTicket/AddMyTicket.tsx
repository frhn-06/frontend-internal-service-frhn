"use client"

import ButtonFlat from "@/components/ui/Button/ButtonFlat";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import { Input, Form,Label, Modal, Surface, TextField, useOverlayState, Select, ListBox, TextArea } from "@heroui/react";
import useAddMyTicket from "./useAddMyTicket";
import { Controller } from "react-hook-form";
import {  useEffect } from "react";
import { IDepartment } from "@/types/department";
import { selectPriorities } from "@/configs/inputFormConfig";

interface TypeProps {
  refetch: () => void;
}

const AddMyTicket = (props: TypeProps) => {
  const {
    refetch
  } = props;

  const {
    dataSelectDepartments,

    dataSelectCategories,

    control,
    handleSubmit,
    errors,
    reset,
    setValue,

    isPendingAddTicket,
    isSuccessAddTicket,

    onAddTicket
  } = useAddMyTicket();

  const state = useOverlayState();

  useEffect(() => {
    if (!state.isOpen) {
      reset();
    }
  }, [state.isOpen]);

  useEffect(() => {
    if(isSuccessAddTicket) {
      state.close();
      refetch();
    }
  }, [isSuccessAddTicket])
  
  


  return (
    <Modal state={state}>
      <ButtonSolid>
        Add Ticket
      </ButtonSolid>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>
                Buat Ticket
              </Modal.Heading>

              <p className="mt-1.5 text-sm leading-5 text-muted">
                description
              </p>
            </Modal.Header>
            <Form className="mt-2" onSubmit={handleSubmit(onAddTicket)}>
              <Modal.Body>
                <Surface variant="default">
                  <div className="flex flex-col gap-4">
                    {errors?.root && (
                      <p className="text-red-500 text-sm">
                        {errors?.root.message}
                      </p>
                    )}

                    <TextField className="w-full" name="title" type="text" variant="secondary">
                      <Label>
                        Subject
                      </Label>
                      <Controller control={control} name="title" render={({field}) => (
                        <Input 
                          {...field}
                          placeholder="Contoh: Wifi bermasalah"
                          className={errors?.title ? "ring-1 ring-red-500" : ""} 
                        />
                      )} />
                      {errors?.title && (
                        <p className="text-red-500 text-sm mt-1">
                        {errors?.title.message}
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
                          placeholder="Jelaskan permasalahan lebih detail"
                          className={errors?.description ? "ring-1 ring-red-500" : ""} 
                        />
                      )} />
                      {errors?.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors?.description.message}
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
                          placeholder="Select a department"
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                            setValue("categoryId", "")
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

                    <TextField className="w-full" name="categoryId" type="text" variant="secondary">
                      <Label>
                        Category
                      </Label>
                      <Controller control={control} name="categoryId" render={({field}) => (
                        <Select
                          aria-label="Category"
                          name={field.name}
                          className={`w-[256px] ${errors?.categoryId && "ring-1 ring-red-500 rounded-xl"}`}
                          placeholder="Select a category"
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
                              {dataSelectCategories?.map((department: IDepartment) => (
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
                      {errors?.categoryId && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors?.categoryId.message}
                        </p>
                      )}
                    </TextField>


                    <TextField className="w-full" name="priority" type="text" variant="secondary">
                      <Label>
                        Priority
                      </Label>
                      <Controller control={control} name="priority" render={({field}) => (
                        <Select
                          aria-label="Department"
                          name={field.name}
                          className={`w-[256px] ${errors?.priority && "ring-1 ring-red-500 rounded-xl"}`}
                          placeholder="Select a priority"
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
                              {selectPriorities?.map((list: {id:string; label: string}) => (
                                <ListBox.Item 
                                  key={list.id} 
                                  id={list.id} 
                                  textValue={list.label}
                                  className="cursor-pointer"
                                >
                                  {list.label}

                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                              ))}
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      )} />
                      {errors?.priority && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors?.priority.message}
                        </p>
                      )}
                    </TextField>

                  </div>
                </Surface>
              </Modal.Body>

              <Modal.Footer>
                <ButtonFlat slot="close" onPress={reset} isDisabled={isPendingAddTicket}>
                  Cancel
                </ButtonFlat>
                <ButtonSolid type="submit" isDisabled={isPendingAddTicket}>
                  {isPendingAddTicket ? "Saving..." : "Save"}
                </ButtonSolid>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default AddMyTicket;
                   