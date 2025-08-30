import { useEffect } from "react";
import socket from "../utils/socket";
import { useNotifStore } from "../stores/notifStore";

export default function SocketBridge() {
  const increment = useNotifStore((s) => s.increment);

  useEffect(() => {
    const onMatchFound = (payload) => {
      console.log("[SocketBridge] matchFound:", payload);
      increment(1);
    };

    const EVENT = "matchFound"; // 🔁 change to "newMatch" if that’s your server event
    socket.on(EVENT, onMatchFound);
    return () => socket.off(EVENT, onMatchFound);
  }, [increment]);

  return null;
}
