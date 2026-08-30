"use client"
import { Input } from "@heroui/react";
import { Search, X } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface TypeProps {
  className?: string;
  textSearch?: string;
  onSearch?: (e:ChangeEvent<HTMLInputElement>) => void;
  onClearSearch?: () => void;
}

const InputSearch = (props: TypeProps) => {
  const {
    className,
    textSearch = "Cari",
    onSearch,
    onClearSearch
  } = props;
  
  const [value, setValue] = useState("");


  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if(onSearch) {
      onSearch(e);
      setValue(e.target.value)
    }
  }


  const onChangeClearSearch = () => {
    if(onClearSearch) {
      setValue("");
      onClearSearch();
    }
  }

  return (
    <div className={"relative w-full max-w-80 rounded-2xl border-3 border-gray-500" +  className}>
      <Input 
        aria-label="Search" 
        fullWidth
        placeholder={textSearch}
        onChange={onChangeSearch}
        value={value}
      />
    
      {value.length < 1 ? (
        <Search 
          className="h-[80%] absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-foreground" 
        />
      ) : (
        <X
          onClick={onChangeClearSearch}
          className="h-[80%] absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-foreground" 
        />
      )}
    </div>
  )
}

export default InputSearch;