import AuthService from "@/services/auth.service";
import dashboardService from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

const useDashboard = () => {
    
    const getDashboard = async () => {
        const {data} = await dashboardService.agent();
        return data.data;
    }


    const {
        data: dataDashboard,
        isLoading: isLoadingDashboard,
        isSuccess: isSuccessDashboard,
        isError: isErrorDashboard,
        error: errorDashboard
    } = useQuery({
        queryKey: ["Dashboard-Agent"],
        queryFn: getDashboard,
    })


    const getUser = async () => {
        const {data} = await AuthService.getUser();
        return data.data;
    }


    const {
        data: dataUser,
        isLoading: isLoadingUser,
        isSuccess: isSuccessUser,
        isError: isErrorUser,
        error: errorUser
    } = useQuery({
        queryKey: ["User-Agent-Dashboard"],
        queryFn: getUser,
    })
    
    return {
        dataDashboard,
        isLoadingDashboard,
        isSuccessDashboard,
        isErrorDashboard,
        errorDashboard,

        dataUser,
        isLoadingUser,
        isSuccessUser,
        isErrorUser,
        errorUser
    }
}

export default useDashboard;