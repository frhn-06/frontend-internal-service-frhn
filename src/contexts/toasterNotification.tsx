"use client"
import { createContext, useContext, useState } from "react";


interface IToasterNotification {
    type: string;
    title: string;
    description: string
}

interface ToasterContextType {
    toasterNotification: IToasterNotification | null;
    setToasterNotification: (data: IToasterNotification) => void
}
const toasterNotificationContext = createContext<ToasterContextType>({
    toasterNotification: {
        type: "",
        title: "",
        description: ""
    },
    setToasterNotification: () => {}
})



const ToasterNotificationProvider = ({children} : {children: React.ReactNode}) => {
    const [toasterNotification, setToasterNotificationState] = useState<IToasterNotification | null>(null)

    const setToasterNotification = (data: IToasterNotification) => {
        setToasterNotificationState(data);
    }

    return (
        <toasterNotificationContext.Provider value={{toasterNotification, setToasterNotification}}>
            {children}
        </toasterNotificationContext.Provider>
    )
    
}


const useToasterNotification = () => {
    return useContext(toasterNotificationContext);
}


export {ToasterNotificationProvider, useToasterNotification}