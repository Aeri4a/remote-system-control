import './App.css'
import { Box, Button, Card, CardBody, CardHeader } from '@chakra-ui/react'
import axios from 'axios'

const API_URL = 'http://backend:5000/api';

const App = () => {
  const connect = () => {
    const res = axios.get(`${API_URL}/connect`);
    console.log(res);
  }

  const disconnect = () => {
    const res = axios.get(`${API_URL}/disconnect`);
    console.log(res);
  }

  const checkConnection = () => {
    const res = axios.get(`${API_URL}/check-connection`);
    console.log(res);
  }

  return (
    <Card size='sm' variant='outline'>
      <CardHeader>Functionalities</CardHeader>
      <CardBody>
        <Box p={4}>
          <Button onClick={connect}>Connect</Button>
        </Box>
        <Box p={4}>
          <Button onClick={disconnect}>Disonnect</Button>
        </Box>
        <Box p={4}>
          <Button onClick={checkConnection}>Check connection</Button>
        </Box>
      </CardBody>
    </Card>
  )
}

export default App
