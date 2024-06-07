import { FunctionComponent } from "react";
import {
  Container,
  Content,
  LogContainer,
  StyledHeader,
  Topbar,
} from "./DashboatdView.styles";
import ConnectionBox, { ConnectionText, StatusColor } from "../ConnectionBox";
import { Box, Button } from "@chakra-ui/react";

const DashboardView: FunctionComponent = () => {
  return (
    <Container>
      <Topbar>
        <ConnectionBox
          statusColor={StatusColor.ACTIVE}
          contentText={ConnectionText.ACTIVE}
        />
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
              <Button size="lg">Connect</Button>
            </Box>
            <Box p={4}>
              <Button size="lg">Disonnect</Button>
            </Box>
            <Box p={4}>
              <Button size="lg">Check connection</Button>
            </Box>

            <Box p={4}>
              <Button size="lg">Device WakeOnLAN</Button>
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
