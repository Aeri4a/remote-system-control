import './App.css'
import { Box, Button, Card, CardBody, CardHeader } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react';
import axios from 'axios'

const API_URL = 'http://localhost:5000/api';

const App = () => {
  const toast = useToast();

  const connect = () => {
    axios.get(`${API_URL}/connect`).then(_ => {
      toast({
        title: 'Allowed external connection',
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

  const disconnect = () => {
    axios.get(`${API_URL}/disconnect`).then(_ => {
      toast({
        title: 'Disallowed external connection',
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

  const checkConnection = () => {
    axios.get(`${API_URL}/check-connection`).then(_ => {
      toast({
        title: 'Connection check success',
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
