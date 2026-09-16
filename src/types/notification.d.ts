interface INotification {
    id?: number;
    targetId?: number;
    actorId?: number;
    ticketId?: number;
    title?: string;
    message?: string;
    type?: string;
    isRead?: boolean;
    

    ticket?: {
        title?: string;
    }

    actor?: {
        name?: string;
    }

    target?: {
        name?: string;
        role?: string;
    }

    createdAt?: string;
}


export default INotification;