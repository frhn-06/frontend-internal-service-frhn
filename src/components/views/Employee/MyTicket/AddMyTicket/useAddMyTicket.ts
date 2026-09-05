import { useToaster } from "@/contexts/toasterContext";
import DepartmentService from "@/services/department.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { schemaTicketValidation } from "./validation";
import AgentService from "@/services/agent.service";
import CategoryService from "@/services/category.service";
import { ITicketForm } from "@/types/ticket";
import TicketService from "@/services/ticket.service";

const useAddTicket = () => {
    const { setToaster } = useToaster();



    const {
        control,
        handleSubmit,
        formState: {errors},
        setError,
        reset,
        watch,
        setValue
    } = useForm({
        resolver: yupResolver(schemaTicketValidation),
        defaultValues: {
            title: "",
            description: "",
            departmentId: "",
            categoryId: "",
            priority: ""
        }
    })

    // const departmentValue = getValues("departmentId");
    const departmentValue = watch("departmentId")


    const SelectDepartment = async () => {
        const params = `limit=100`;
        const {data} = await DepartmentService.findAll(params);   
        return data.data;
    }


    const {
        data: dataSelectDepartments,
    } = useQuery({
        queryKey: ["SelectDepartmentsForAddTicket"],
        queryFn: SelectDepartment,
    });

    
    const SelectCategories = async (id: string) => {
        const {data} = await CategoryService.findByDepartment(id);   
        return data.data;
    }


    const {
        data: dataSelectCategories,
    } = useQuery({
        queryKey: ["SelectCategoriesForAddTicket", departmentValue],
        queryFn: () => SelectCategories(`${departmentValue}`),
        enabled: !!departmentValue
    });






    const CreateTicket = async (payload: ITicketForm) => {
        const {data} = await TicketService.create(payload);
        return data.data;
    }

    const {
        mutate: mutateAddTicket,
        isPending: isPendingAddTicket,
        isSuccess: isSuccessAddTicket
    } = useMutation({
        mutationFn: (payload: ITicketForm) => CreateTicket(payload),
        onError: (error) => {
            setError("root", {
                type: "server",
                message: error.message
            });
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil membuat ticket"
            });
            reset();
        }
    })

    const onAddTicket = (payload: ITicketForm) => {
        const data = {
            ...payload,
            departmentId: Number(payload.departmentId),
            categoryId: Number(payload.categoryId)
        }
        mutateAddTicket(data);
    }
    

    return {
        dataSelectDepartments,

        dataSelectCategories,

        control,
        handleSubmit,
        errors,
        setError,
        reset,
        setValue,

        isPendingAddTicket,
        isSuccessAddTicket,
        onAddTicket
    }
}

export default useAddTicket;