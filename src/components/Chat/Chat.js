import React from 'react';
import { Flex, Text, Input, InputRightElement, InputGroup, IconButton, List, ListItem, ListIcon, Box } from '@chakra-ui/core';
import { MdSend } from 'react-icons/md';
import Message from './Message';
import './Chat.css'

const Chat = () => {    
    return (
        <Flex w='100%' border='1px' borderColor='darkColor' h='100%' bg='darkestColor' color='lightColor' direction='column'>
            <Flex h='90%' direction='column'>
                <Flex borderBottom='1px' borderColor='darkColor'>
                    <Text as='span' fontFamily='primary' m='5px' ml='10px'>Chat</Text>
                </Flex>
                <Flex w='100%' direction='column' overflow='auto' className='messages'>
                    <Message name='Me' self={true} message='Hello'></Message>
                    <Message name='You' self={false} message='Hey'></Message>
                    <Message name='Me' self={true} message='How are you?'></Message>
                    <Message name='You' self={false} message='Wanna start again?'></Message>
                    <Message name='Me' self={true} message='Sure!'></Message>
                    <Message name='Me' self={true} message='Hello'></Message>
                    <Message name='You' self={false} message='Hey'></Message>
                    <Message name='Me' self={true} message='How are you?'></Message>
                    <Message name='You' self={false} message='Wanna start again?'></Message>
                    <Message name='Me' self={true} message='Sure!'></Message>
                    <Message name='Me' self={true} message='Hello'></Message>
                    <Message name='You' self={false} message='Hey'></Message>
                    <Message name='Me' self={true} message='How are you?'></Message>
                    <Message name='You' self={false} message='Wanna start again?'></Message>
                    <Message name='Me' self={true} message='Sure!'></Message>
                    <Message name='Me' self={true} message='Hello'></Message>
                    <Message name='You' self={false} message='Hey'></Message>
                    <Message name='Me' self={true} message='How are you?'></Message>
                    <Message name='You' self={false} message='Wanna start again?'></Message>
                    <Message name='Me' self={true} message='Sure!'></Message>
                    <Message name='Me' self={true} message='Try a multiline!'></Message>
                    <Message name='You' self={false} message='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ad laborum nulla cupiditate quaerat aliquam nobis temporibus expedita optio accusantium?'></Message>
                    <Message name='MyNameIsSooBigYouCantFitMeInIt' self={false} message='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ad laborum nulla cupiditate quaerat aliquam nobis temporibus expedita optio accusantium?'></Message>
                </Flex>
            </Flex>
            <Flex h='10%' align='center'>
                <InputGroup w='100%' h='80%' size='md'>
                    <Input
                        pr='3rem'
                        w='100%'
                        h='100%'
                        placeholder='Type message here...'
                        bg='darkColor'
                        color='lightColor'
                        border='0'
                        fontFamily='secondary'
                        borderRadius='50rem'
                    />
                    <InputRightElement h='100%' width='2.5rem'>
                        <IconButton icon={MdSend} fontSize='18px' bg='primaryColor' color='secondaryColor' _hover={{ bg: 'lightColor', color: 'darkColor' }} _active={{ bg: 'white', color: 'darkestColor' }} cursor='pointer' isRound size='sm'/>
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Flex>
    );
}
export default Chat;
