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

interface IStatisticsAdmin {
    totalTickets: number;
    ticketsOpen: number;
    ticketsWaiting: number;
    ticketsInProgress: number;
    ticketsResolved: number;
}


interface IAgentInfo {
    totalAgents: number;
    activeAgents: number;
}

interface IDepartmentsChart {
    id: number;
    name: string;
    count: number;
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


interface IDashboardAdmin {
    statistics: IStatisticsAdmin,
    recentTickets: ITicket[];
    agentInfo: IAgentInfo,
    departmentsChart: IDepartmentsChart 
}

export type {
    IDashboardAgent, 
    IDashboardEmployee, 
    IDashboardAdmin,
    IStatisticsAgent, 
    IStatisticsEmployee, 
    IStatisticsAdmin,
    IAgentInfo,
    IDepartmentsChart
}