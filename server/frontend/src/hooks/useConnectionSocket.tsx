import { useEffect } from "react";
import { io } from "socket.io-client";
import { ServerState } from "../App";

const SOCKET_URL = "http://localhost:5000";

interface ConnectionSocket {
  serverState: ServerState;
  updateServerState: (state: ServerState) => void;
}

const useConnectionSocket = ({ serverState, updateServerState }: ConnectionSocket) => {
  const socket = io(SOCKET_URL, { autoConnect: false });

  useEffect(() => {
    if (socket.disconnected) {
      socket.removeAllListeners('SERVER_ACTIVE');
      socket.removeAllListeners('disconnect');
    };

    switch (serverState) {
      case ServerState.ACTIVE:
        break;
      case ServerState.WAITING:
        if (socket.disconnected) {
          socket.connect();
          socket.on
          socket.on('SERVER_ACTIVE', () => {
            updateServerState(ServerState.ACTIVE);
          });
          socket.on('disconnect', () => {
            updateServerState(ServerState.WAITING);
          });
        };
        break;
      case ServerState.NOT_ACTIVE:
        socket.offAny();
        socket.close();
        break;
    };
  }, [serverState, socket]);

  useEffect(() => {
    socket.close();
  }, []);

  return {
    connect: true,
  };
};

export default useConnectionSocket;
