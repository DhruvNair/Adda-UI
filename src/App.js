import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Flex, Text, Image, Box } from '@chakra-ui/core';
import Form from './components/Form/Form';
import Dashboard from './components/Dashboard/Dashboard';
import Logo from './assets/AddaLogo.svg';

function App() {
    return (
        <Flex direction='column' align='center' justify='center' minH={window.innerHeight} bg='lightColor' color='darkColor' userSelect='none'>
            <Flex align='center' position='absolute' top='0' justify='space-between' w='100%' alignSelf='start'>
                <Flex p='20px' justify='center' align='center'>
                    <Image w='50px' h='50px' mr='20px' src={Logo} draggable='false' />
                    <Text as='span' fontFamily='primary' fontSize='35px' fontWeight='bold'>ADDA</Text>
                </Flex>
            </Flex>
            <Router>
                <Box w='100%' alignSelf='center'>
                    <Switch>
                        <Route path="/" exact>
                            <Form />
                        </Route>
                        <Route path="/:id">
                            <Dashboard />
                        </Route>
                    </Switch>
                </Box>
            </Router>
        </Flex>
    );
}

export default App;
