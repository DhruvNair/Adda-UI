import React, { useState } from 'react';
import axios from '../../services/axios';
import { Redirect } from 'react-router-dom';
import { Flex, Text, Image, Box, Input, Stack, InputLeftElement, InputGroup, Icon, Button, useToast } from '@chakra-ui/core';
import FriendsImage from '../../assets/friends.svg';
import { MdHome, MdPerson } from 'react-icons/md';
import './Form.css'

const Form = () => {
    const toast = useToast();
    const [meetingName, setMeetingName] = useState('');
    const [name, setName] = useState('');
    const [created, setCreated] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [meetingId, setMeetingId] = useState(null);

    const createMeeting = async () => {
        setSubmitted(true);
        let roomName = meetingName || 'Nameless Wonder';
        try {
            const res = await axios.post('/', {
                name: roomName
            })
            toast({
                position: "top-right",
                duration: 3000,
                render: (props) => (
                    <Box m={3} p={6} onClick={props.onClose} color="white" p={3} bg="green.500">
                        Room Created Successfully!
                    </Box>
                ),
            })
            setSubmitted(false);
            setName(name => (name || 'Nameless Wonder'))
            setMeetingId(res.data);
            setCreated(true);
            console.log()
        } catch(e) {
            setSubmitted(false);
            console.log(e)
        }
    }

    if (created) return <Redirect to={`/${meetingId}?name=` + name.split(' ').join('%20')}/>

    return (
        <Flex w='100%' align='center' justify='center'>
            <Flex w={['90%', '70%', '50%', '70%']} direction={['column', 'column', 'column', 'row']} rounded='20px' overflow='hidden'bg='darkColor' color='lightColor' justify='space-between'>
                <Flex bg='secondaryColor' color='primaryColor' py='20px' direction='column' align='center' justify='center' className='slanted' w={['100%', '100%', '100%', '50%']}>
                    <Text fontFamily='primary' my='15px' as='span' fontSize='20px'>Hey there, Welcome to ADDA!</Text>
                    <Image my='10px' w='70%' src={FriendsImage} draggable='false'/>
                    <Text fontFamily='primary' my='15px' as='span' fontSize='20px'>Your go-to place to hang out!</Text>
                </Flex>
                <Flex align='center' pb='50px' justify='center' w={['100%', '100%', '100%', '50%']}>
                    <Box w='70%'>
                        <Stack spacing={4}>
                            <Text textAlign='center' fontSize='20px' fontFamily='primary' as='span'>Create a room</Text>
                            <InputGroup align='baseline'>
                                <InputLeftElement h='100%' children={<Icon as={MdHome} fontSize='20px'/>} />
                                <Input fontFamily='primary' onChange={(e) => setMeetingName(e.target.value)} placeholder='Room Name'/>
                            </InputGroup>
                            <InputGroup align='baseline'>
                                <InputLeftElement h='100%' children={<Icon as={MdPerson} fontSize='20px'/>} />
                                <Input fontFamily='primary' onChange={(e) => setName(e.target.value)} placeholder='Your Name'/>
                            </InputGroup>
                            <Button onClick={createMeeting} isLoading={submitted} loadingText={'Creating ' + (meetingName || 'Room')} as='div' fontFamily='primary' variantColor='teal'>Create {meetingName ? meetingName : 'my room'}</Button>
                        </Stack>
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    );
}
 
export default Form;