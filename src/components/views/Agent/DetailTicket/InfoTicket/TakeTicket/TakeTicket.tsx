import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import { ITicket } from "@/types/ticket";
import { Modal } from "@heroui/react";
import React, { useEffect } from "react";
import useTakeTicket from "./useTakeTicket";

interface TypeProps {
  refetch: () => void;
  data: ITicket;
  Button: React.ReactNode;
}

const TakeTicket = (props: TypeProps) => {
  const {
    refetch,
    data,
    Button
  } = props;

  const {
    isPendingTakeTicket,
    isSuccessTakeTicket,

    onTake
  } = useTakeTicket(`${data.id}`)


  useEffect(() => {
    if(isSuccessTakeTicket) {
      refetch();
    }
  }, [isSuccessTakeTicket])



  return (
    <Modal>
      {Button}
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Take Ticket</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                Anda yakin akan mangambil ticket ini ({data?.title})
              </p>
            </Modal.Body>
            <Modal.Footer>
              <ButtonSolid fullWidth isDisabled={isPendingTakeTicket} onPress={onTake}>
                {isPendingTakeTicket ? "Loading..." : "Take"}
              </ButtonSolid>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default TakeTicket;