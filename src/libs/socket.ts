import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_URL_SOCKET_BACKEND, {
    autoConnect: false,
    transports: ["websocket"]
});

export default socket;