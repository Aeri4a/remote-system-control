import { FunctionComponent } from "react";
import {
  Container,
  Content,
  LogContainer,
  StyledHeader,
  Topbar,
} from "./DashboatdView.styles";
import ConnectionBox from "../ConnectionBox";
import { Box, Button } from "@chakra-ui/react";

const DashboardView: FunctionComponent = () => {
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
              <Button size="lg" width={200}>Device WakeOnLAN</Button>
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
