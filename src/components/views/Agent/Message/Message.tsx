"use client"

import ButtonSolid from "@/components/ui/Button/ButtonSolid"
import { Breadcrumbs, Form, TextArea } from "@heroui/react"
import useMessage from "./useMessage"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { IUser } from "@/types/user"
import { Controller } from "react-hook-form"
import cn from "@/utils/cn"
import BubbleChats from "./BubbleChats"



const Message = () => {
  const {
    dataMessages,
    isLoadingMessages,
    isErrorMessages,
    errorMessages,
    refetchMessage,

    dataTicketMessage,
    isLoadingTicketMessage,
    isErrorTicketMessage,

    handleSubmit,
    control,
    errors,


    onMessage,
    isSuccess
  } = useMessage();


  useEffect(() => {
    if(isSuccess) {
      refetchMessage();
    }
  }, [isSuccess])

  const user = useSession().data?.user as IUser;


  const isLoading = isLoadingMessages || isLoadingTicketMessage;
  const isError = isErrorMessages || isErrorTicketMessage;


  return (
    isError ? (
      <div>
        <p>
          {errorMessages?.message}
        </p>
      </div>
    ) : (
      <div className="h-full overflow-hidden flex flex-col">
        <div className="p-4">
          <Breadcrumbs>
            <Breadcrumbs.Item href={`/employee/my-ticket`}>
              My Tickets
            </Breadcrumbs.Item>
            <Breadcrumbs.Item href={`/employee/my-ticket/${dataTicketMessage?.id}`}>
              {dataTicketMessage?.number}
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              Message
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>

        
        <BubbleChats 
          data={dataMessages || []} 
          user={user} 
          isLoading={isLoading}
        />


        <div className="shrink-0 px-4 py-2 w-full  max-w-2xl mx-auto">
          <Form onSubmit={handleSubmit(onMessage)}>
            <div className="flex items-end gap-2">   
              <Controller control={control} name="content" render={({field}) => (
                <TextArea 
                  {...field}
                  fullWidth 
                  variant="secondary"
                  className={cn(`focus:ring-text-element`, {"ring-1 ring-red-400" : !!errors?.content})}
                />
              )} />     
              <ButtonSolid type="submit">
                Send
              </ButtonSolid>
            </div>
          </Form>
        </div>
      </div>
    )
  )
}


export default Message