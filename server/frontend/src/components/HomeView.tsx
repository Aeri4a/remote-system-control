import { FunctionComponent } from "react";
import {
  Card,
  CardFooter,
  CardHeader,
  Container,
  Text,
} from "@chakra-ui/react";
import ConnectionBox from "./ConnectionBox";

const HomeView: FunctionComponent = () => (
  <Container
    display="flex"
    flexGrow={1}
    alignItems="center"
    justifyContent="center"
    alignContent="center"
    maxW={800}
  >
    <Card
      flexGrow={1}
      height={300}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CardHeader>
        <Text fontSize={25} align="center">
          Server is not accepting connections
        </Text>
      </CardHeader>
      <CardFooter>
        <ConnectionBox/>
      </CardFooter>
    </Card>
  </Container>
);

export default HomeView;
