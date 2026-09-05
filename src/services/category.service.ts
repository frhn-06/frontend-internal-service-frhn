import instance from "@/libs/axios";
import { ICategoryForm } from "@/types/category";
import endpoint from "./endpoint";

const CategoryService = {
    create: (payload: ICategoryForm) => instance.post(`${endpoint.CATEGORY}`, payload),

    findAll: (params: string) => instance.get(`${endpoint.CATEGORY}?${params}`),

    findByDepartment: (id: string) => instance.get(`${endpoint.CATEGORY}/${id}/by-department`),

    findOne: (id: string) => instance.get(`${endpoint.CATEGORY}/${id}`),

    update: (id: string, payload: ICategoryForm) => instance.patch(`${endpoint.CATEGORY}/${id}`, payload),

    status: (id: string) => instance.patch(`${endpoint.CATEGORY}/${id}/status`),

    delete: (id: string) => instance.delete(`${endpoint.CATEGORY}/${id}`)
}

export default CategoryService;