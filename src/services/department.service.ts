import instance from "@/libs/axios";
import { IDepartmentForm } from "@/types/department";
import endpoint from "./endpoint";

const DepartmentService = {
    create: (data: IDepartmentForm) => instance.post(`${endpoint.DEPARTMENT}`, data),

    findAll: (params: string) => instance.get(`${endpoint.DEPARTMENT}?${params}`),

    findOne: (id: string) => instance.get(`${endpoint.DEPARTMENT}/${id}`),

    update: (id:string, data: IDepartmentForm) => instance.patch(`${endpoint.DEPARTMENT}/${id}`, data),

    delete: (id: string) => instance.delete(`${endpoint.DEPARTMENT}/${id}`)
}

export default DepartmentService;