interface IDepartmentForm {
    name: string;
}

interface IDepartment extends IDepartmentForm {
    id: number;
    name: string;
    createdAt: string | Date;
}

export type {IDepartmentForm, IDepartment}