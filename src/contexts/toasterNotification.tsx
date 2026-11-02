// "use client"
// import { createContext, useContext, useState } from "react";


// interface IToasterNotification {
//     type: string;
//     title: string;
//     description: string
// }

// interface ToasterContextType {
//     toasterNotification: IToasterNotification | null;
//     setToasterNotification: (data: IToasterNotification) => void
// }
// const toasterNotificationContext = createContext<ToasterContextType>({
//     toasterNotification: {
//         type: "",
//         title: "",
//         description: ""
//     },
//     setToasterNotification: () => {}
// })



// const ToasterNotificationProvider = ({children} : {children: React.ReactNode}) => {
//     const [toasterNotification, setToasterNotificationState] = useState<IToasterNotification | null>(null)

//     const setToasterNotification = (data: IToasterNotification) => {
//         setToasterNotificationState(data);
//     }

//     return (
//         <toasterNotificationContext.Provider value={{toasterNotification, setToasterNotification}}>
//             {children}
//         </toasterNotificationContext.Provider>
//     )
    
// }


// const useToasterNotification = () => {
//     return useContext(toasterNotificationContext);
// }


// export {ToasterNotificationProvider, useToasterNotification}











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