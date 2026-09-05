"use client"

import { Modal, useOverlayState } from "@heroui/react";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import { useEffect } from "react";
import useChangeStatus from "./useChangeStatus";

interface TypeProps {
  data: Record<string, unknown>,
  refetch: () => void;
  ButtonOpen: React.ReactNode;
}

const ChangeStatus = (props: TypeProps) => {
  const {
    data,
    refetch,
    ButtonOpen
  } = props;

  const {
    isPendingChangeStatus,
    isSuccessChangeStatus,
    isErrorChangeStatus,
    onChangeStatus
  } = useChangeStatus(`${data.id}`);

  const state = useOverlayState();

  useEffect(() => {
    if(isSuccessChangeStatus) {
      refetch();
      state.close();
    }
  }, [isSuccessChangeStatus]);

  useEffect(() => {
    if(isErrorChangeStatus) {
      state.close();
    }
  },[isErrorChangeStatus])


  return (
    <Modal state={state}>
      {ButtonOpen}
      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Change Agent Status</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                Anda yakin akan mengubah status {`${data.name}`} menjadi {data.isActive ? "NonActive" : "Active"}?
              </p>
              <p className="text-sm text-gray-500">
                Perubahan status akan diterapkan segera.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <ButtonSolid 
                className="w-full bg-green-500 hover:bg-green-400 active:hover:bg-green-600" 
                isDisabled={isPendingChangeStatus}
                onPress={onChangeStatus}
              >
                {isPendingChangeStatus ? "Loading..." : "Change"}
              </ButtonSolid>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default ChangeStatus;