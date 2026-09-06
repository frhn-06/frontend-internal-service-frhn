import { Building2, LayoutDashboard, Ticket, Tickets, User, UserRound, Users } from "lucide-react";

const listSidebar = {
    admin: [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: <LayoutDashboard />,
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
        {
            id: "category",
            label: "Categories",
            icon: <UserRound />,
            href: "/admin/category"
        }
    ],

    agent: [
        {
            id: "dashboard",
            label: "Dashboard",
            icon:  <LayoutDashboard />,
            href: "/agent/dashboard"
        },
        {
            id: "tickets",
            label: "Tickets",
            icon: <Ticket />,
            href: "/agent/ticket"
        },
        {
            id: "user",
            label: "Profile",
            icon: <User />,
            href: "/agent/user"
        },
    ],

    employee: [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: <LayoutDashboard />,
            href: "/employee/dashboard"
        },
        {
            id: "my-tickets",
            label: "My Tickets",
            icon: <Ticket />,
            href: "/employee/my-ticket"
        },
        {
            id: "user",
            label: "Profile",
            icon: <User />,
            href: "/employee/user"
        },
    ]
}

export default listSidebar;