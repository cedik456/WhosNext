import { io } from "socket.io-client";

const socket = io("https://whosnextbackend.onrender.com", {
  transports: ["websocket"],
});

export default socket;
