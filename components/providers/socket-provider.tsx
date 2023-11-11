"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO, Socket } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let subs: Socket;

    (async function () {
      const io = await ClientIO(process.env.NEXT_PUBLIC_SITE_URL!, {
        path: "/api/socket/io",
        addTrailingSlash: false,
      });

      io.on("connect", () => {
        setIsConnected(true);
      });

      io.on("disconnect", () => {
        setIsConnected(false);
      });

      subs = io;

      setSocket(io);
    })();

    return () => {
      subs.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
