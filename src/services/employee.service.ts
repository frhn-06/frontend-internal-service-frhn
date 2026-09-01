import instance from "@/libs/axios";
import endpoint from "./endpoint";

const EmployeeService = {
    findAll: (params: string) => instance.get(`${endpoint.EMPLOYEE}?${params}`),

    findOne: (id: string) => instance.get(`${endpoint.EMPLOYEE}/${id}`),

    status: (id: string) => instance.patch(`${endpoint.EMPLOYEE}/${id}/status`),

    delete: (id: string) => instance.delete(`${endpoint.EMPLOYEE}/${id}`),
}

export default EmployeeService;