import { ITicket } from "@/types/ticket";
import { Modal, useOverlayState } from "@heroui/react"
import ButtonSolid from '@/components/ui/Button/ButtonSolid'
import { useEffect } from "react";

interface TypeProps {
  data: ITicket;
  onGenerate: () => void;
  isPending: boolean;
  isSuccess: boolean;
}
const ModalGenerateAi = (props: TypeProps) => {
  const {
    data,
    onGenerate,
    isPending,
    isSuccess
  } = props;

  const state = useOverlayState();

  useEffect(() => {
    if(isSuccess) {
      state.close()
    }
  }, [isSuccess])

  return (
    <Modal state={state}>
      <ButtonSolid fullWidth className="mt-2" >
        Generate AI
      </ButtonSolid>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Generate Ai</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p className="text-foreground">
                Anda yakin akan menggenerate obrolan dengan judul <span className="underline">{data?.title}</span> ke Ai?
              </p>
            </Modal.Body>
            <Modal.Footer>
              <ButtonSolid fullWidth isDisabled={isPending} onPress={onGenerate}>
                {isPending ? "Loading..." : "Generate"}
              </ButtonSolid>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}


export default ModalGenerateAi;