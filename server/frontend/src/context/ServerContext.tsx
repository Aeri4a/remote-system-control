import { createContext } from "react";
import { ServerState } from "../App";

interface ServerContextI {
    serverState: ServerState;
    updateServerState: (state: ServerState) => void;
}

export const ServerContext = createContext<ServerContextI | undefined>(undefined);
