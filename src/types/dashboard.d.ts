import { ITicket } from "./ticket";

interface IStatisticsEmployee {
    totalTickets: number;
    ticketsOpen: number;
    ticketsInprogress: number;
    ticketsResolved: number;
    ticketsWaiting: number;
}

interface IStatisticsAgent {
    totalTickets: number;
    ticketsOpen: number;
    myTickets: number;
    ticketsWaiting: number;
    ticketsReprogress: number;
    ticketsResolved: number;
}


interface IDashboardEmployee {
    statistics: IStatisticsEmployee;
    recentTickets: ITicket[];
    waitingTickets: ITicket[];
}


interface IDashboardAgent {
    statistics: IStatisticsAgent;
    recentTickets: ITicket[];
    waitingTickets: ITicket[];
    reProgressTickets: ITicket[];
}


export type {IDashboardAgent, IDashboardEmployee, IStatisticsAgent, IStatisticsEmployee}