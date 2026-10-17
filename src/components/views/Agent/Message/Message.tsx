"use client"

import ButtonSolid from "@/components/ui/Button/ButtonSolid"
import { Form, TextArea } from "@heroui/react"
import useMessage from "./useMessage"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { IUser } from "@/types/user"
import { Controller } from "react-hook-form"
import cn from "@/utils/cn"
import BubbleChats from "./BubbleChats"
import ModalGenerateAi from "./ModalGenerateAi"
import { useQueryClient } from "@tanstack/react-query"
import socket from "@/libs/socket"
import { useParams } from "next/navigation"



const Message = () => {
  const {
    isLoadingMessages,
    isErrorMessages,
    errorMessages,
    isSuccessMessages,

    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,

    messages,

    dataTicketMessage,
    isLoadingTicketMessage,
    isErrorTicketMessage,

    handleSubmit,
    control,
    errors,

    onMessage,
    isPendingCreateMessage,

    onGenerate,
    isPendingGenerateAi,
    isSuccessGenerateAi,

    onReadMessages,
  } = useMessage();

  
    const queryClient = useQueryClient();

    const params = useParams();
    const id = params.id;
  

    useEffect(() => {
      if(!dataTicketMessage) return;
      
      const conncetSocket = () => {
        socket.on("message:new", () => {
          queryClient.invalidateQueries({
            queryKey: ["MessagesAgent", id]
          })
        });

        if(socket.connected) {
          socket.emit(`ticket:join`, dataTicketMessage.id)
          console.log("socket join to ticket:", dataTicketMessage.id)
        }
      }

      conncetSocket();

      return () => {
        socket.off("message:new");
      }
    },[dataTicketMessage, id, queryClient])


  useEffect(() => {
    if(!isSuccessMessages  || !dataTicketMessage?.id) return;
  
    onReadMessages();
  }, [isSuccessMessages, dataTicketMessage?.id])

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
        
        <div className="shrink-0 w-full max-w-2xl mx-auto flex flex-col h-full bg-white">
          <BubbleChats 
            data={messages} 
            user={user} 
            isLoading={isLoading}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />

          <div className="px-4 py-2">
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
                <ButtonSolid type="submit" isDisabled={isPendingCreateMessage || isPendingGenerateAi}>
                  Send
                </ButtonSolid>
              </div>
            </Form>
            
            <ModalGenerateAi
              data={dataTicketMessage}
              onGenerate={onGenerate}
              isPending={isPendingGenerateAi}
              isSuccess={isSuccessGenerateAi}
            />
          </div>

        </div>


      </div>
    )
  )
}


export default Message