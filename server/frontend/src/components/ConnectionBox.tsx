import { FunctionComponent, useContext } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "../config/config";
import { ServerState } from "../App";
import { ServerContext } from "../context/ServerContext";

export enum StatusColor {
  ACTIVE = "#4DE85D",
  WAITING = "#F3961B",
  NOT_ACTIVE = "#E93131",
}

export enum ConnectionText {
  ACTIVE = "Disallow connections",
  WAITING = "Waiting for the connection",
  NOT_ACTIVE = "Allow connections",
}

const StatusCirle = styled.div<{ $color: StatusColor }>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${({ $color }) => $color};
`;

const ConnectionBox: FunctionComponent= () => {
  const toast = useToast();
  const { serverState, updateServerState } = useContext(ServerContext)!;

  const statusText = () => {
    switch (serverState) {
      case ServerState.ACTIVE:
        return ConnectionText.ACTIVE;
      case ServerState.WAITING:
        return ConnectionText.WAITING;
      case ServerState.NOT_ACTIVE:
        return ConnectionText.NOT_ACTIVE;
    }
  };

  const statusColor = () => {
    switch (serverState) {
      case ServerState.ACTIVE:
        return StatusColor.ACTIVE;
      case ServerState.WAITING:
        return StatusColor.WAITING;
      case ServerState.NOT_ACTIVE:
        return StatusColor.NOT_ACTIVE;
    }
  };

  const handleConnect = () => {
    axios
      .get(`${API_URL}/connect`)
      .then((_) => {
        toast({
          title: "Allowed external connection",
          status: "success",
        });
        updateServerState(ServerState.WAITING);
      })
      .catch((err) => {
        toast({
          title: "An error occured :'(",
          status: "error",
        });
        console.log(err);
      });
  };

  const handleDisconnect = () => {
    axios
      .get(`${API_URL}/disconnect`)
      .then((_) => {
        toast({
          title: "Disallowed external connection",
          status: "success",
          position: "top",
        });
        updateServerState(ServerState.NOT_ACTIVE);
      })
      .catch((err) => {
        toast({
          title: "An error occured :'(",
          status: "error",
          position: "top",
        });
        console.log(err);
      });
  };

  const handleClick = () => {
    switch (serverState) {
      case ServerState.ACTIVE:
        return handleDisconnect;
      case ServerState.WAITING:
        return () => {};
      case ServerState.NOT_ACTIVE:
        return handleConnect;
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={5}>
      <StatusCirle $color={statusColor()} />
      <Button size="lg" onClick={handleClick()}>
        <Text fontSize={25}>{statusText()}</Text>
      </Button>
    </Box>
  );
};

export default ConnectionBox;
