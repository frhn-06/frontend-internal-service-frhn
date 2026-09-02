interface ICategory {
    id?: number;
    name?: string;
    description?: string;
    isActive?: boolean;
    departmentId?: number;
    department?: {
        id?: number;
        name?: string;
    }
    createdAt?: string;
}


interface ICategoryForm extends Omit<ICategory, 'id' | 'createdAt' | 'department' | 'isActive' | 'departmentId'> {
    departmentId?: number;
}


export type { ICategory, ICategoryForm };