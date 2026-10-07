import { Card, Form, Label, TextField , Input } from "@heroui/react";
import ButtonSolid from '@/components/ui/Button/ButtonSolid'
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useTabPassword from "./useTabPassword";

interface TypeProps {
  refetch: () => void;
  isRefetching: boolean;
}

const TabPassword = (props: TypeProps) => {
  const {
    refetch,
    isRefetching
  } = props;

  const {
    controlUpdatePassword,
    handleSubmitUpdatePassword,
    errorsUpdatePassword,
    resetUpdatePassword,

    isPendingUpdatePassword,
    isSuccessUpdatePassword,

    onUpdatePassword
  } = useTabPassword();

  useEffect(() => {
    if(isSuccessUpdatePassword) {
      refetch();
      resetUpdatePassword();
    }
  }, [isSuccessUpdatePassword]);

  return (
    <Card className="w-full">
      <Card.Header>
        <h1 className="text-foreground text-lg lg:text-xl font-bold">
          Kata Sandi
        </h1>
        <p className="text-gray-500">
          Perbarui kata sandi akun anda?
        </p>
      </Card.Header>
      <Form onSubmit={handleSubmitUpdatePassword(onUpdatePassword)}>
        <Card.Content>
          <div className="flex flex-col gap-4">
            {errorsUpdatePassword?.root && (
              <p className="text-danger text-sm">
                {errorsUpdatePassword?.root?.message}
              </p>
            )}
            <TextField name="oldPassword" type="password">
              <Label>Kata Sandi lama</Label>
              <Controller control={controlUpdatePassword} name="oldPassword" render={({field}) => (
                <div>
                  <Input 
                    {...field}
                    type="password"
                    placeholder="Masukkan kata sandi lama"
                    variant="secondary"
                    fullWidth
                  />

                  {errorsUpdatePassword?.oldPassword !== undefined && (
                    <p className="text-danger text-sm mt-1">
                      {errorsUpdatePassword?.oldPassword?.message}
                    </p>
                  )}
                </div>
              )} />
            </TextField>
            <TextField name="newPassword" type="password">
              <Label>Kata Sandi lama</Label>
              <Controller control={controlUpdatePassword} name="newPassword" render={({field}) => (
                <div>
                  <Input 
                    {...field}
                    type="password"
                    placeholder="Masukkan kata sandi baru"
                    variant="secondary"
                    fullWidth
                  />

                  {errorsUpdatePassword?.newPassword !== undefined && (
                    <p className="text-danger text-sm mt-1">
                      {errorsUpdatePassword?.newPassword?.message}
                    </p>
                  )}
                </div>
              )} />
            </TextField>
            <TextField name="confirmPassword" type="password">
              <Label>Konfirmasi Kata Sandi</Label>
              <Controller control={controlUpdatePassword} name="confirmPassword" render={({field}) => (
                <div>
                  <Input 
                    {...field}
                    type="password"
                    placeholder="Masukkan konfirmasi Kata sandi baru"
                    variant="secondary"
                    fullWidth
                  />

                  {errorsUpdatePassword?.confirmPassword !== undefined && (
                    <p className="text-danger text-sm mt-1">
                      {errorsUpdatePassword?.confirmPassword?.message}
                    </p>
                  )}
                </div>
              )} />
            </TextField>
           
          </div>
        </Card.Content>
        <Card.Footer className="mt-4 flex flex-col gap-2">
          <ButtonSolid type="submit" className="ml-auto" isDisabled={isPendingUpdatePassword}>
            {isPendingUpdatePassword ? "Mengupdate..." : "Update"}
          </ButtonSolid>
        </Card.Footer>
      </Form>
    </Card>
  )
}

export default TabPassword;