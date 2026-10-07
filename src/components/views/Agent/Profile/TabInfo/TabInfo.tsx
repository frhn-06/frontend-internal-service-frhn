import { Card, Form, Label, TextField , Input, Skeleton} from "@heroui/react";
import ButtonSolid from '@/components/ui/Button/ButtonSolid'
import useTabInfo from "./useTabInfo";
import { IUser } from "@/types/user";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface TypeProps {
  dataInfo: IUser;
  isLoading: boolean;
  refetch: () => void;
  isRefetching: boolean;
}

const TabInfo = (props: TypeProps) => {
  const {
    dataInfo,
    isLoading,
    refetch,
    isRefetching
  } = props;

  const {
    controlUpdateProfile,
    handleSubmitUpdateProfile,
    errorsUpdateProfile,
    resetUpdateProfile,

    isPendingUpdateProfile,
    isSuccessUpdateProfile,

    onUpdateProfile
  } = useTabInfo();

  useEffect(() => {
    if(dataInfo && !isLoading && !isRefetching) {
      resetUpdateProfile({
        name: dataInfo.name
      })
    }
  }, [dataInfo, isLoading, isRefetching])


  useEffect(() => {
    if(isSuccessUpdateProfile) {
      refetch();
    }
  }, [isSuccessUpdateProfile])

  return (
    <Card className="w-full">
      <Card.Header>
        <h1 className="text-foreground text-lg lg:text-xl font-bold">
          Informasi akun
        </h1>
        <p className="text-gray-500">
          Perbarui informasi akun anda?
        </p>
      </Card.Header>
      <Form onSubmit={handleSubmitUpdateProfile(onUpdateProfile)}>
        <Card.Content>
          <div className="flex flex-col gap-4">
            {errorsUpdateProfile?.root && (
              <p className="text-danger text-sm">
                {errorsUpdateProfile?.root?.message}
              </p>
            )}
            <TextField name="email" type="text">
              <Label>Nama</Label>
              <Controller control={controlUpdateProfile} name="name" render={({field}) => (
                <div>
                  {isLoading ? (
                    <Skeleton className="h-9 w-full rounded-xl" />
                  ) : (
                    <Input 
                      {...field}
                      placeholder="Agus" 
                      variant="secondary"
                      fullWidth
                    />
                  )}

                  {errorsUpdateProfile?.name !== undefined && (
                    <p className="text-danger text-sm mt-1">
                      {errorsUpdateProfile?.name?.message}
                    </p>
                  )}
                </div>
              )} />
            </TextField>
            <TextField name="email" type="email">
              <Label>Email</Label>
                {isLoading ? (
                  <Skeleton className="h-9 w-full rounded-xl" />
                ) : (
                  <Input 
                    placeholder="agus@gmail.com" 
                    variant="secondary" 
                    value={dataInfo?.email}
                    disabled
                  />
                )}
            </TextField>
            <TextField name="department" type="text">
              <Label>Department</Label>
                {isLoading ? (
                  <Skeleton className="h-9 w-full rounded-xl" />
                ) : (
                  <Input 
                    placeholder="Department name" 
                    variant="secondary" 
                    value={dataInfo?.department?.name}
                    disabled
                  />
                )}     
            </TextField>
          </div>
        </Card.Content>
        <Card.Footer className="mt-4 flex flex-col gap-2">
          <ButtonSolid 
            type="submit" 
            className="ml-auto" 
            isDisabled={isPendingUpdateProfile || isLoading}
          >
            {isPendingUpdateProfile ? "Mengupdate..." : "Update"}
          </ButtonSolid>
        </Card.Footer>
      </Form>
    </Card>
  )
}

export default TabInfo;