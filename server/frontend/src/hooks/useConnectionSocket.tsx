import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ServerState } from "../App";

const SOCKET_URL = "http://localhost:5000";

interface ConnectionSocket {
  serverState: ServerState;
  updateServerState: (state: ServerState) => void;
}

const useConnectionSocket = ({ serverState, updateServerState }: ConnectionSocket) => {
  const socket = io(SOCKET_URL, { autoConnect: false });
  const [timeoutID, setTimeoutID] = useState<number | undefined>(undefined);

  // check if socket connection is lost in case waiting
  // if it is then check connection to backend
  useEffect(() => {
    switch (serverState) {
      case ServerState.ACTIVE:
        const id = setTimeout(() => {
            updateServerState(ServerState.WAITING);
            console.log('Connection timeout');
        }, 5000); // 5 sec
        setTimeoutID(id);
        break;
      case ServerState.WAITING:
        if (!socket.connected) socket.connect();
        
        socket.on("SERVER_ACTIVE", () => {
            clearTimeout(timeoutID);
            updateServerState(ServerState.ACTIVE);
        });
        break;
      case ServerState.NOT_ACTIVE:
        socket.close();
        break;
    };
  }, [serverState]);

  useEffect(() => {
    socket.close();
  }, []);

  return {
    connect: true,
  };
};

export default useConnectionSocket;
