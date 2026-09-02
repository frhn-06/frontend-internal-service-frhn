"use client"

import { Modal, useOverlayState } from "@heroui/react";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import { useEffect } from "react";
import useDeleteCategory from "./useDeleteCategory";

interface TypeProps {
  data: Record<string, unknown>,
  refetch: () => void;
  ButtonOpen: React.ReactNode;
}

const DeleteCategory = (props: TypeProps) => {
  const {
    data,
    refetch,
    ButtonOpen
  } = props;

  const {
    isPendingDeleteCategory,
    isSuccessDeleteCategory,
    isErrorDeleteCategory,
    onDeleteCategory
  } = useDeleteCategory(`${data.id}`);

  const state = useOverlayState();

  useEffect(() => {
    if(isSuccessDeleteCategory) {
      refetch();
      state.close();
    }
  }, [isSuccessDeleteCategory]);

  useEffect(() => {
    if(isErrorDeleteCategory) {
      state.close();
    }
  },[isErrorDeleteCategory])


  return (
    <Modal state={state}>
      {ButtonOpen}
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Hapus Category</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                Anda yakin akan menghapus kategori {`${data.name}`}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <ButtonSolid 
                className="w-full bg-red-500 hover:bg-red-400 active:hover:bg-red-600" 
                isDisabled={isPendingDeleteCategory}
                onPress={onDeleteCategory}
              >
                {isPendingDeleteCategory ? "Menghapus..." : "Hapus"}
              </ButtonSolid>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default DeleteCategory;