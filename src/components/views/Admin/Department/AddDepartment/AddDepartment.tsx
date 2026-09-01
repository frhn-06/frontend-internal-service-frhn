"use client"

import ButtonFlat from "@/components/ui/Button/ButtonFlat";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import { Input, Form,Label, Modal, Surface, TextField, useOverlayState } from "@heroui/react";
import useAddDepartment from "./useAddDepartment";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface TypeProps {
  refetch: () => void;
}

const AddDepartment = (props: TypeProps) => {
  const {
    refetch
  } = props;

  const {
    control,
    handleSubmit,
    errors,
    reset,

    isPendingAddDepartment,
    isSuccessAddDepartment,

    onAddDepartment
  } = useAddDepartment();

  const state = useOverlayState();

  useEffect(() => {
    if (!state.isOpen) {
      reset();
    }
  }, [state.isOpen]);

  useEffect(() => {
    if(isSuccessAddDepartment && state.isOpen) {
      refetch();
      state.close();
    }
  }, [isSuccessAddDepartment, state.isOpen])
  

  return (
    <Modal state={state}>
      <ButtonSolid>
        Tambah Department
      </ButtonSolid>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>
                Buat Department
              </Modal.Heading>

              <p className="mt-1.5 text-sm leading-5 text-muted">
                description
              </p>
            </Modal.Header>
            <Form className="mt-2" onSubmit={handleSubmit(onAddDepartment)}>
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
                          placeholder="Contoh: Department Finance"
                          className={errors?.name ? "ring-1 ring-red-500" : ""} 
                        />
                      )} />
                      {errors?.name && (
                        <p className="text-red-500 text-sm mt-1">
                        {errors?.name.message}
                      </p>
                      )}
                    </TextField>
                  </div>
                </Surface>
              </Modal.Body>

              <Modal.Footer>
                <ButtonFlat slot="close" onPress={reset} isDisabled={isPendingAddDepartment}>
                  Kembali
                </ButtonFlat>
                <ButtonSolid type="submit" isDisabled={isPendingAddDepartment}>
                  {isPendingAddDepartment ? "Menyimpan..." : "Simpan"}
                </ButtonSolid>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default AddDepartment;