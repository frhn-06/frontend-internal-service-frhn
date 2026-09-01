interface IAgent {
    id?: number;
    name?: string;
    email?: string;
    department?: {
        id?: number;
        name?: string; 
    } | null;
    isActive?: boolean;
    createdAt?: string;

}


interface IAgentForm extends Omit<IAgent, "id" | "department" | "isActive" | "createdAt">   {
    departmentId?:  number | string;
    password?: string;
}

export type { IAgent, IAgentForm };