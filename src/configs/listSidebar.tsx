import { Building2, LayoutDashboard, Tickets, UserRound, Users } from "lucide-react";

const listSidebar = {
    admin: [
        {
            id: "dashboard",
            label: "Dashboard",
            icon:   <LayoutDashboard />,
            href: "/admin/dashboard"
        },
        {
            id: "tickets",
            label: "All Tickets",
            icon: <Tickets />,
            href: "/admin/ticket"
        },
        {
            id: "departments",
            label: "Departments",
            icon: <Building2 />,
            href: "/admin/department"
        },
        {
            id: "agents",
            label: "Agent Management",
            icon: <Users />,
            href: "/admin/agent"
        },
        {
            id: "employees",
            label: "Employees",
            icon: <UserRound />,
            href: "/admin/employee"
        },
    ],

    agent: [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: "LayoutDashboard",
        },
        {
            id: "my-tickets",
            label: "My Tickets",
            icon: "Ticket",
        },
        {
            id: "unassigned-tickets",
            label: "Unassigned",
            icon: "Inbox",
        },
    ],

    employee: [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: "LayoutDashboard",
        },
        {
            id: "my-tickets",
            label: "My Tickets",
            icon: "Ticket",
        },
        {
            id: "create-ticket",
            label: "Create Ticket",
            icon: "PlusCircle",
        },
    ]
}

export default listSidebar;