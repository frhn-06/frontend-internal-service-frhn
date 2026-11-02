"use client"
import { createContext, useCallback, useContext, useState } from "react";


interface IToasterNotification {
    id: string;
    type: string;
    title: string;
    description: string
}

interface ToasterContextType {
    toasterNotification: IToasterNotification[];
    setToasterNotification: (data: IToasterNotification) => void;
    removeToasterNotification: (id: string) => void;
}
const toasterNotificationContext = createContext<ToasterContextType>({
    toasterNotification: [],
    setToasterNotification: () => {},
    removeToasterNotification: () => {}
});



const ToasterNotificationProvider = ({children} : {children: React.ReactNode}) => {
    const [
        toasterNotification, 
        setToasterNotificationState
    ] = useState<IToasterNotification[]>([])

    const setToasterNotification = (data: IToasterNotification) => {
        setToasterNotificationState(prev => [...prev, data]);
    }

    const removeToasterNotification = useCallback((id: string) => {
        setToasterNotificationState(prev => prev.filter((notification) =>{
            return notification.id !== id
        }));
    }, []);

    return (
        <toasterNotificationContext.Provider 
            value={{
                toasterNotification, 
                setToasterNotification, 
                removeToasterNotification
            }}
        >
            {children}
        </toasterNotificationContext.Provider>
    )
    
}


const useToasterNotification = () => {
    return useContext(toasterNotificationContext);
}


export {ToasterNotificationProvider, useToasterNotification}