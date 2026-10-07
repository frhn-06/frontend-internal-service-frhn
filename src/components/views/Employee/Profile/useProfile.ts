import AuthService from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

const useProfile = () => {

    const getUser = async () => {
        const {data} = await AuthService.getUser();
        return data.data;
    }

    const {
        data: dataUser,
        isLoading: isLoadingUser,
        isSuccess: isSuccessUser,
        refetch: refetchUser,
        isRefetching: isRefetchingUser,
        isError: isErrorUser,
        error: errorUser
    } = useQuery({
        queryKey: ["User-Profile-Employee"],
        queryFn: getUser
    })

    

    

    
    return {
        dataUser,
        isLoadingUser,
        isSuccessUser,
        refetchUser,
        isRefetchingUser,
        isErrorUser,
        errorUser,
    }
}

export default useProfile;