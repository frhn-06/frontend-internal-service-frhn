"use client"

import { Modal, useOverlayState } from "@heroui/react";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import { useEffect } from "react";
import useDeleteAgent from "./useDeleteAgent";

interface TypeProps {
  data: Record<string, unknown>,
  refetch: () => void;
  ButtonOpen: React.ReactNode;
}

const DeleteAgent = (props: TypeProps) => {
  const {
    data,
    refetch,
    ButtonOpen
  } = props;

  const {
    isPendingDeleteAgent,
    isSuccessDeleteAgent,
    isErrorDeleteAgent,
    onDeleteAgent
  } = useDeleteAgent(`${data.id}`);

  const state = useOverlayState();

  useEffect(() => {
    if(isSuccessDeleteAgent) {
      refetch();
      state.close();
    }
  }, [isSuccessDeleteAgent]);

  useEffect(() => {
    if(isErrorDeleteAgent) {
      state.close();
    }
  },[isErrorDeleteAgent])


  return (
    <Modal state={state}>
      {ButtonOpen}
      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Hapus Agent</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                Anda yakin akan menghapus {`${data.name}`}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <ButtonSolid 
                className="w-full bg-red-500 hover:bg-red-400 active:hover:bg-red-600" 
                isDisabled={isPendingDeleteAgent}
                onPress={onDeleteAgent}
              >
                {isPendingDeleteAgent ? "Menghapus..." : "Hapus"}
              </ButtonSolid>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default DeleteAgent;