import { useRef } from "react";

const useDebaunce = () => {

    const timeOut = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debaunce = (func: () => void, delay: number) => {
        if(timeOut.current) clearTimeout(timeOut.current);

        timeOut.current = setTimeout(() => {
            func();
        }, delay)
    }

    return {
        debaunce
    }
}

export default useDebaunce;