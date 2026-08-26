interface IUser {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    departmentId?: number;
    role?: string;
}

interface IRegisterForm extends Omit<IUser, "departmentId" | "role"> {
    confirmPassword?: string;
}

interface ILoginForm {
    identifier: string;
    password: string;
}


export type { IUser, IRegisterForm, ILoginForm };