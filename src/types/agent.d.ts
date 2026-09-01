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