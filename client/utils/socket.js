import { io } from "socket.io-client";

const socket = io("http://10.79.183.195:3000", {
  transports: ["websocket"],
});

export default socket;
