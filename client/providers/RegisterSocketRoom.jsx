// providers/RegisterSocketRoom.jsx
import { useEffect, useMemo, useRef } from "react";
import socket from "../utils/socket";
import { useAuth } from "../hooks/useAuth";

export default function RegisterSocketRoom() {
  const { user } = useAuth();
  const prevUidRef = useRef(null);

  // Canonicalize to one stable string id without changing your AuthProvider
  const uid = useMemo(() => {
    const raw = user?._id ?? user?.id ?? null;
    return raw ? String(raw) : null;
  }, [user?._id, user?.id]);

  useEffect(() => {
    if (!uid) {
      console.log("[RegisterSocketRoom] no user yet", user);
      return;
    }

    // If the user id changed (e.g., id ➜ _id), leave the old room first
    const prev = prevUidRef.current;
    if (prev && prev !== uid) {
      socket.emit("unregister", prev);
      console.log("[RegisterSocketRoom] unregistered previous:", prev);
    }
    prevUidRef.current = uid;

    const register = () => {
      socket.emit("register", uid);
      console.log("[RegisterSocketRoom] registered:", uid);
    };

    // Guard against Fast Refresh dupes
    socket.off("connect", register);
    register(); // initial
    socket.on("connect", register); // re-register on reconnect

    return () => socket.off("connect", register);
  }, [uid, user]); // depends on canonical uid

  return null;
}
