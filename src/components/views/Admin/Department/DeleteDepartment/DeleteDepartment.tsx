"use client"

import useDeleteDepartment from "./useDeleteDepartment";
import { Modal, useOverlayState } from "@heroui/react";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import { useEffect } from "react";

interface TypeProps {
  data: Record<string, unknown>,
  refetch: () => void;
  ButtonOpen: React.ReactNode;
}

const DeleteDepartment = (props: TypeProps) => {
  const {
    data,
    refetch,
    ButtonOpen
  } = props;

  const {
    isPendingDeleteDepartment,
    isSuccessDeleteDepartment,
    isErrorDeleteDepartment,
    onDeleteDepartment
  } = useDeleteDepartment(`${data.id}`);

  const state = useOverlayState();

  useEffect(() => {
    if(isSuccessDeleteDepartment) {
      refetch();
      state.close();
    }
  }, [isSuccessDeleteDepartment]);

  useEffect(() => {
    if(isErrorDeleteDepartment) {
      state.close();
    }
  },[isErrorDeleteDepartment])


  return (
    <Modal state={state}>
      {ButtonOpen}
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Hapus Depertment</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                Anda yakin akan menghapus {`${data.name}`}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <ButtonSolid 
                className="w-full bg-red-500 hover:bg-red-400 active:hover:bg-red-600" 
                isDisabled={isPendingDeleteDepartment}
                onPress={onDeleteDepartment}
              >
                {isPendingDeleteDepartment ? "Menghapus..." : "Hapus"}
              </ButtonSolid>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default DeleteDepartment;