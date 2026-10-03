import { IMessage } from "@/types/message";
import { IUser } from "@/types/user";
import cn from "@/utils/cn";
import setTimeMessage from "@/utils/timemessage";
import { Avatar, Skeleton } from "@heroui/react";
import { User } from "lucide-react";
import React, { useEffect } from "react";

interface TypeProps {
  data: IMessage[];
  user: IUser;
  isLoading: boolean;
}

const BubbleChats = (props: TypeProps) => {
  const {
    data,
    user,
    isLoading,
  } = props;


  const endRef = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if(!data) return;
    if(endRef.current) {
      endRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [data]);


  const loadingUi = () => {
    return Array.from({length: 6}).map((_,i) => {
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
    <div className="flex-1 min-h-0 overflow-y-auto px-2">
      <div className="w-full max-w-2xl mx-auto p-2 flex flex-col gap-3">
        {isLoading ? (
        loadingUi()
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