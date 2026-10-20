import { IMessage } from "@/types/message";
import { IUser } from "@/types/user";
import cn from "@/utils/cn";
import convert from "@/utils/convert.";
import setTimeMessage from "@/utils/timemessage";
import { Avatar, Skeleton } from "@heroui/react";
import { User } from "lucide-react";
import React from "react";
import { useEffect } from "react";

interface TypeProps {
  data: IMessage[];
  user: IUser;
  isLoading: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  assignedAt: string | undefined
}

const BubbleChats = (props: TypeProps) => {
  const {
    data,
    user,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    assignedAt
  } = props;

  const chatRef = React.useRef<HTMLDivElement>(null);

  const endRef = React.useRef<HTMLDivElement>(null);
    
  useEffect(() => {
    if(isLoading) return;
    if(!data) return;
    if(endRef.current) {
      endRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [isLoading]);


  const handleScroll = async (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if(e.currentTarget.scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
      const oldScrollHeight = e.currentTarget.scrollHeight;
      const oldScrollTop = e.currentTarget.scrollTop;
      await fetchNextPage();

      requestAnimationFrame(() => {
        if(chatRef.current) {
          const newScrollHeight = chatRef.current.scrollHeight;
          const newScrollTop = oldScrollTop + (newScrollHeight - oldScrollHeight);
          chatRef.current.scrollTop = newScrollTop;
        }
      })
    }
  }

  const loadingBubbleChat = (jumlahBaris : number) => {
    return Array.from({length: jumlahBaris}).map((_,i) => {
      const ganjil = (i + 1)%2 === 0;
      return (
        <div key={i}>
          <Skeleton className="h-4 w-25 rounded-2xl mx-auto mb-1" />

          <div className={cn("w-[70%] flex gap-2", {"ml-auto" : !ganjil})}>
            {ganjil && (
              <Skeleton className="shrink-0 rounded-full aspect-square h-9 w-9 mt-auto" />
            )}

            <Skeleton className="flex-1 rounded-2xl h-12" />
          </div>
        </div>
      )
    })
  }

  return (
    <div 
      ref={chatRef}
      className="flex-1 min-h-0 overflow-y-auto px-2 "
      onScroll={handleScroll}
    >
      {/* pembuka chat */}
      {!isLoading && data && !hasNextPage && assignedAt && (
        <div className="p-4 flex justify-center items-center">
          <div className="p-4 rounded-2xl bg-gray-100">
            <p className="text-center text-text-abu text-xs lg:text-sm italic">
              Tiket diambil pada {convert.dateToLocal(`${assignedAt}`)}
            </p>
          </div>
        </div>
      )}
      <div className="w-full p-2 flex flex-col gap-3">
        {/* loading pagination scroll */}
        {hasNextPage && loadingBubbleChat(2)}

        {isLoading ? (
          loadingBubbleChat(6)
        ) : (
          data && user?.id && data.map((message: IMessage, i: number) => {
            const isMine = message.senderId === Number(user.id);
            const lastMessage = data[i + 1]?.senderId !== message?.senderId;
            return (
              <div key={message.id} >
                <div className="flex flex-col items-center mb-1">
                  <p className="text-text-abu text-xs">
                    {setTimeMessage(`${message.createdAt}`)}
                  </p>
                </div>
  
                <div className={cn(`w-fit max-w-[70%] flex gap-2`, {"ml-auto" : isMine, "mb-2" : lastMessage})} >
                  <Avatar size="sm" className={cn(`mt-auto opacity-0`, {"opacity-100": lastMessage && !isMine})}>
                    <Avatar.Fallback>
                      <User />
                    </Avatar.Fallback>
                  </Avatar>
                  <div className={cn(`px-3 py-2 rounded-2xl bg-gray-200`, {
                    "bg-background-element text-white" : isMine
                    })}
                  >
                    <p className="text-sm">
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        )}

        <div ref={endRef} />
      </div>
    </div>
  )
}



export default BubbleChats;