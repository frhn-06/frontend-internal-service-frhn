import instance from "@/libs/axios";
import endpoint from "./endpoint";

const dashboardService = {
    employee: () => instance.get(`${endpoint.DASHBOARD}/employee`),

    agent: () => instance.get(`${endpoint.DASHBOARD}/agent`)
}

export default dashboardService;