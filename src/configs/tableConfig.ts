export const PAGE_DEFAULT = 1;
export const LIMIT_DEFAULT = 8;
export const LIMIT_CATEGORY_DEFAULT = 16;
export const STATUS_AGENT_DEFAULT = "all";
export const STATUS_CATEGORY_DEFAULT = "all";
export const PRIORITY_TICKET_DEFAULT = "all";
export const STATUS_TICKET_DEFAULT = "all";

export const listLimit = [
    {
        id: "8",
        label: "8"
    },
    {
        id: "16",
        label: "16"
    },
    {
        id: "32",
        label: "32"
    },
    {
        id: "64",
        label: "64"
    }
]

export const listStatus = [
    {
        id: "all",
        label: "Semua"
    },
    {
        id: "true",
        label: "Aktif"
    },
    {
        id: "false",
        label: "Tidak Aktif"
    }
]

export const listStatusTickets = [
    {
        id: "all",
        label: "Semua"
    },
    {
        id: "OPEN",
        label: "Open"
    },
    {
        id: "IN_PROGRESS",
        label: "In Progress"
    },
    {
        id: "WAITING",
        label: "Waiting"
    },
    {
        id: "RESOLVED",
        label: "Resolved"
    },
    {
        id: "CLOSED",
        label: "Closed"
    },
    {
        id: "CANCELLED",
        label: "Cancelled"
    },
]


export const listPriorityTickets = [
    {
        id: "all",
        label: "Semua"
    },
    {
        id: "LOW",
        label: "Low"
    },
    {
        id: "MEDIUM",
        label: "Medium"
    },
    {
        id: "HIGH",
        label: "High"
    },
    {
        id: "URGENT",
        label: "Urgent"
    }
]
