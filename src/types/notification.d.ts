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


interface INotifMessagesByTicket {
    ticketId: number;
    _count: {
        _all: number;
    }
}


export type {INotification, INotifMessagesByTicket};