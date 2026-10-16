import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import { ITicket } from "@/types/ticket";
import { Modal } from "@heroui/react";
import useTakeTicket from "./useTakeTicket";

interface TypeProps {
  data: ITicket;
}

const TakeTicket = (props: TypeProps) => {
  const {
    data,
  } = props;

  const {
    isPendingTakeTicket,

    onTake
  } = useTakeTicket(`${data.id}`)


  return (
    <Modal>
      <ButtonSolid isDisabled={isPendingTakeTicket}>
        {isPendingTakeTicket ? "Mengambil Tiket..." : "Ambil Tiket"}
      </ButtonSolid>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Ambil Tiket</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                Apakah Anda yakin ingin mengambil tiket ini &quot;{data?.title}&quot; untuk ditangani?
              </p>
            </Modal.Body>
            <Modal.Footer>
              <ButtonSolid fullWidth isDisabled={isPendingTakeTicket} onPress={onTake}>
                {isPendingTakeTicket ? "Mengambil Tiket..." : "Ambil Tiket"}
              </ButtonSolid>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default TakeTicket;