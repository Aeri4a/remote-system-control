import { useEffect, useState } from "react";
import "./App.css";

import axios from "axios";
import { API_URL } from "./config/config";
import { useToast } from "@chakra-ui/react";

import DashboardView from "./components/DashboardView";
import HomeView from "./components/HomeView";
import WaitingView from "./components/WaitingView";
import { ServerContext } from "./context/ServerContext";
import useConnectionSocket from "./hooks/useConnectionSocket";

export enum ServerState {
  ACTIVE = 'active',
  WAITING = 'waiting',
  NOT_ACTIVE = 'not_active'
};

const App = () => {
  const toast = useToast();
  const [serverState, setServerState] = useState<ServerState>(ServerState.NOT_ACTIVE);
  useConnectionSocket({ serverState, updateServerState: setServerState });

  const CurrentView = () => {
    switch (serverState) {
      case ServerState.ACTIVE:
        return <DashboardView/>;
      case ServerState.WAITING:
        return (
          <>
            <WaitingView/>
            <DashboardView/>
          </>
        );
      case ServerState.NOT_ACTIVE:
        return <HomeView/>;
    }
  };

  const updateServerState = (state: ServerState) => {
    setServerState(state);
  };

  useEffect(() => {
    axios
      .get<void, { data: { serverStatus: boolean } }>(`${API_URL}/server-status`)
      .then(res => res.data)
      .then(({ serverStatus }) => {
        const status = serverStatus ? ServerState.WAITING : ServerState.NOT_ACTIVE;
        if (serverStatus) {
          toast({
            title: "Server allow connections",
            status: "success",
            position: 'top'
          });
        } else {
          toast({
            title: "Server not allow connections",
            status: "error",
            position: 'top'
          });
        }
        setServerState(status);
      })
      .catch((_) => {
        toast({
          title: "Cannot connect to server",
          status: "error",
          position: 'top'
        });
        setServerState(ServerState.NOT_ACTIVE);
        setTimeout(() => { location.reload(); }, 5000);
      });
  }, []);
  
  return (
    <>
    <ServerContext.Provider value={{ serverState, updateServerState }}>
      <CurrentView/>
    </ServerContext.Provider>
    </>
  );
};

export default App;
