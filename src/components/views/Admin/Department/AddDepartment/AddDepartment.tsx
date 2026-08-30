"use client"

import ButtonFlat from "@/components/ui/Button/ButtonFlat";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";



const AddDepartment = () => {
  

  return (
    <Modal>
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
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4">
                  <TextField className="w-full" name="name" type="text" variant="secondary">
                    <Label>Name</Label>
                    <Input placeholder="Enter your name" />
                  </TextField>
                  <TextField className="w-full" name="email" type="email" variant="secondary">
                    <Label>Email</Label>
                    <Input placeholder="Enter your email" />
                  </TextField>
                  <TextField className="w-full" name="phone" type="tel" variant="secondary">
                    <Label>Phone</Label>
                    <Input placeholder="Enter your phone number" />
                  </TextField>
                  <TextField className="w-full" name="company" variant="secondary">
                    <Label>Company</Label>
                    <Input placeholder="Enter your company name" />
                  </TextField>
                  <TextField className="w-full" name="message" variant="secondary">
                    <Label>Message</Label>
                    <Input placeholder="Enter your message" />
                  </TextField>
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <ButtonFlat slot="close">
                Kembali
              </ButtonFlat>
              <ButtonSolid>
                Simpan
              </ButtonSolid>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default AddDepartment;