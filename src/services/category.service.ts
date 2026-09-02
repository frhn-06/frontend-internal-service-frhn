import instance from "@/libs/axios";
import { ICategoryForm } from "@/types/category";
import endpoint from "./endpoint";

const CategoryService = {
    create: (payload: ICategoryForm) => instance.post(`${endpoint.CATEGORY}`, payload),

    findAll: (params: string) => instance.get(`${endpoint.CATEGORY}?${params}`),

    findOne: (id: number) => instance.get(`${endpoint.CATEGORY}/${id}`),

    update: (id: number, payload: ICategoryForm) => instance.patch(`${endpoint.CATEGORY}/${id}`, payload),

    status: (id: number) => instance.patch(`${endpoint.CATEGORY}/${id}/status`),

    delete: (id: number) => instance.delete(`${endpoint.CATEGORY}/${id}`)
}

export default CategoryService;