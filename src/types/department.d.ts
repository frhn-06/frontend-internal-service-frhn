interface IDepartmentForm {
    name: string;
}

interface IDepartment extends IDepartmentForm {
    id: number;
    name: string;
    createdAt: string;
}

export type {IDepartmentForm, IDepartment}