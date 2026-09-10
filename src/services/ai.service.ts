import instance from "@/libs/axios";
import endpoint from "./endpoint";

const AiService = {
    generate: (id: string) => instance.post(`${endpoint.TICKET}/${id}/ai/reply`)
}

export default AiService;