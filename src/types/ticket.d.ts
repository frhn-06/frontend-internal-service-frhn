interface ITicketForm {
    title?: string;
    description?: string;
    priority?: string;
    departmentId?: number | string;
    categoryId?: number | string;  
}

interface Relation {
    id?: number;
    name?: string;
}


interface ITicket extends ITicketForm {
    id?: number;
    agentId?: number | null;
    employeeId?: number;
    status?: string;
    priority?: string;

    department?: Relation;
    category?: Relation;
    employee?: Relation;
    agent?: Relation | null;
    
    createdAt?: string;
    updatedAt?: string;
    assignedAt?: string;
    resolvedAt?: string;
    closedAt?: string;
}

export type {ITicketForm, ITicket}