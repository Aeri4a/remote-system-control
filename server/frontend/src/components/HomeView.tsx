import { FunctionComponent } from "react";
import {
  Container,
  Text,
  Box
} from "@chakra-ui/react";
import ConnectionBox from "./ConnectionBox";
import { Colors } from "../config/config";

const HomeView: FunctionComponent = () => (
  <Container
    display="flex"
    flexGrow={1}
    alignItems="center"
    justifyContent="center"
    alignContent="center"
    backgroundColor={Colors.C2}
    minWidth='100%'
    gap={5}
  >
    <Box
      backgroundColor={Colors.C3}
      paddingLeft={10}
      paddingRight={10}
      paddingTop="50px"
      paddingBottom="50px"
      borderRadius={10}
    >
      <Text fontSize={23} align="center">
        Server is not accepting connections
      </Text>
    </Box>
    <Box
      borderColor={Colors.C9}
      borderWidth={1}
      backgroundColor={Colors.C3}
      paddingLeft={10}
      paddingRight={10}
      paddingTop="42px"
      paddingBottom="42px"
      borderRadius={10}
    >
      <ConnectionBox/>
    </Box>
  </Container>
);

export default HomeView;
