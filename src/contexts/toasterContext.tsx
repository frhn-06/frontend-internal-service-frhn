"use client";
import { createContext, useContext, useState } from "react";



type ToasterType = "success" | "error" | "";

interface Toaster {
  type: ToasterType;
  message: string;
}

interface ToasterContextType {
  toaster: Toaster | null;
  setToaster: (toaster: Toaster) => void;
}

export const toasterContext = createContext<ToasterContextType>({
  toaster: {
    type: "",
    message: ""
  },
  setToaster: () => {},
});


interface TypeProps {
  children: React.ReactNode;
}


export const ToasterProvider = (props: TypeProps) => {
  const {
    children
  } = props;

  const [toaster, setToasterState] = useState<Toaster | null>(null);

  const setToaster = (data: Toaster) => {
    setToasterState(data);
  };

  return (
    <toasterContext.Provider value={{ toaster ,setToaster }}>
      {children}
    </toasterContext.Provider>
  );
};

export const useToaster = () => {
  return useContext(toasterContext);
};