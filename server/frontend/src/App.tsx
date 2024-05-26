import './App.css'
import { Box, Button, Card, CardBody, CardHeader, Input } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react';
import axios from 'axios'
import { useState } from 'react';

const API_URL = 'http://localhost:5000/api';

const App = () => {
  const toast = useToast();

  const [macAddress, setMacAddress] = useState<string>('');

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
    <Card size='sm' variant='outline' display='flex' alignItems='center'>
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
        
        <Box p={4} display='flex' alignItems='center' gap='20px'>
        <Input
          placeholder='MAC ADDRESS'
          width='auto'
          value={macAddress}
          onChange={(e) => setMacAddress(e.target.value)}
        />
          <Button onClick={devicewol}>Device WakeOnLAN</Button>
        </Box>
      </CardBody>
    </Card>
  )
}

export default App
