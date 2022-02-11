import Socket from "socket.io-client";
import { URL } from "../Api/constant";
import { getToken } from "../db/token";

export const callSocket = () => {
  const token = getToken();
  const io = Socket(URL ? URL : "", {
    auth: (cb) => cb({ token }),
  });

  io.on("connect_error", (err) => {
    console.log("socket error", err.message);
  });

  return io;
};

export const onSync = (io: any, emit: string) => {
  if (!io.connected) {
    io.connect();
  }
  io.on(emit, (message: string) => {
    return () => io.off(emit);
  });
};
