interface ICategory {
    id?: number;
    name?: string;
    description?: string | null;
    isActive?: boolean;
    departmentId?: number;
    department?: {
        id?: number;
        name?: string;
    }
    createdAt?: string;
}


interface ICategoryForm extends Omit<ICategory, 'id' | 'createdAt' | 'department' | 'isActive' | 'departmentId'> {
    departmentId: number | string;
}


export type { ICategory, ICategoryForm };