import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ServerContext } from "../context/ServerContext";
import axios from "axios";
import { API_URL } from "../config/config";
import { ServerState } from "../App";

const Background = styled.div({
  display: "flex",
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "black",
  width: "100%",
  height: "100%",
  zIndex: "100",
  opacity: "0.8",
});

const WaitingView: FunctionComponent = () => {
  const toast = useToast();
  const [counter, setCounter] = useState<number>(0);
  const { updateServerState } = useContext(ServerContext)!;

  const handleDisallow = () => {
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

  useEffect(() => {
    const interv = setInterval(() => {
      setCounter((prevState) => (prevState < 3 ? prevState + 1 : 0));
    }, 500);

    return () => clearInterval(interv);
  }, []);

  return (
    <Background>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
        border="1px solid gray"
        borderRadius={6}
        width={500}
        p={4}
      >
        <Text fontSize={30}>
          {"Waiting for connection" + ".".repeat(counter)}
        </Text>
        <Button onClick={handleDisallow}>Cancel</Button>
      </Box>
    </Background>
  );
};

export default WaitingView;
