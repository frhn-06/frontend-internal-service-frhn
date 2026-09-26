"use client"

import ButtonSolid from "@/components/ui/Button/ButtonSolid"
import { Breadcrumbs, Form, TextArea } from "@heroui/react"
import useMessage from "./useMessage"
import { useEffect } from "react"
import { getSession, useSession } from "next-auth/react"
import { IUser } from "@/types/user"
import { Controller } from "react-hook-form"
import cn from "@/utils/cn"
import BubbleChats from "./BubbleChats"
import ModalGenerateAi from "./ModalGenerateAi"
import Link from "next/link"
import { useQueryClient } from "@tanstack/react-query"
import { CustomSession } from "@/libs/axios"
import socket from "@/libs/socket"
import { useParams } from "next/navigation"



const Message = () => {
  const {
    dataMessages,
    isLoadingMessages,
    isErrorMessages,
    errorMessages,
    isSuccessMessages,

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
      
      const conncetSocket = async () => {
        const session  : CustomSession | null = await getSession();
        if(!session || !session.accessToken) return;

        const joinTicket = () => {
          socket.emit(`ticket:join`, dataTicketMessage.id)
          console.log("socket join to ticket:", dataTicketMessage.id)
        }
  
        socket.auth = {
          token: session.accessToken
        }
  
        socket.on("connect", () => {
          console.log("socket connnected:", socket.id);

          joinTicket();
        })

        socket.on("message:new", () => {
          queryClient.invalidateQueries({
            queryKey: ["MessagesAgent", id]
          })
        });

        if(socket.connected) {
          joinTicket();
        }

        socket.connect();
      }

      conncetSocket();

      return () => {
        socket.off("connect");
        socket.off("message:new");
        socket.disconnect();
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
        <div className="p-4">
          <Breadcrumbs>
            <Breadcrumbs.Item>
              <Link href={`/agent/ticket`}>
                Tickets
              </Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Link href={`/agent/ticket/${dataTicketMessage?.id}`}>
                {dataTicketMessage?.number}
              </Link>
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


        <div className="shrink-0 px-4 py-2 w-full max-w-2xl mx-auto">
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
    )
  )
}


export default Message