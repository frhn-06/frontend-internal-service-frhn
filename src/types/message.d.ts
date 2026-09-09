interface IMessageForm {
    content: string;
}

interface IMessage extends IMessageForm {
    id?: number;
    senderId?: number;
    ticketId?: number;
    sender?: {
        id?: number;
        name?: string;
        role?: string;
    };
    ticket?: {
        id?: number;
        title?: string;
        status?: string;
        priority?: string;
    };
    createdAt?: string;
}


export type {IMessage, IMessageForm}