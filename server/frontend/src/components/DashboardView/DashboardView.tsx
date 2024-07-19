import { FunctionComponent } from "react";
import {
  Container,
  Content,
  LogContainer,
  StyledHeader,
  Topbar,
} from "./DashboatdView.styles";
import ConnectionBox from "../ConnectionBox";
import { Box, Button, useToast } from "@chakra-ui/react";
import { API_URL } from "../../config/config";
import axios from "axios";

const macAddress = '';

const DashboardView: FunctionComponent = () => {
  const toast = useToast();

  const devicewol = () => {
    const payload = { mac: macAddress, broadcast: '' }

    axios.post(`${API_URL}/devicewol`, payload).then(_ => {
      toast({
        title: 'Run success',
        status: 'success'
      })
    }).catch(err => {
      toast({
        title: 'An error occured :\'(',
        status: 'error'
      })
      console.log(err);
    });
  }

  return (
    <Container>
      <Topbar>
        <ConnectionBox />
      </Topbar>
      <Content>
        <Box flexGrow={3} display="flex" flexDirection="column" m={5} gap={3}>
          <StyledHeader p={3}>Tools</StyledHeader>
          <Box
            p={3}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box p={4}>
              <Button size="lg" width={200}>Logging test</Button>
            </Box>
            <Box p={4}>
              <Button size="lg" width={200} onClick={devicewol}>Device WakeOnLAN</Button>
            </Box>
          </Box>
        </Box>
        <Box flexGrow={5} display="flex" flexDirection="column" m={5} gap={3}>
          <StyledHeader p={3}>Logs</StyledHeader>
          <LogContainer>Log</LogContainer>
        </Box>
      </Content>
    </Container>
  );
};

export default DashboardView;
