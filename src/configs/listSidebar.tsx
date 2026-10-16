import { Building2, ChartBarStacked, LayoutDashboard, Ticket, Tickets, User, UserRound, UserRoundPen, Users } from "lucide-react";

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
            id: "category",
            label: "Categories",
            icon: <ChartBarStacked />,
            href: "/admin/category"
        },
        {
            id: "agents",
            label: "Agents",
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
            id: "profile",
            label: "Profile",
            icon: <UserRoundPen />,
            href: "/admin/profile"
        },
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
            id: "profile",
            label: "Profile",
            icon: <UserRoundPen />,
            href: "/agent/profile"
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
            id: "profile",
            label: "Profile",
            icon: <UserRoundPen />,
            href: "/employee/profile"
        },
    ]
}

export default listSidebar;