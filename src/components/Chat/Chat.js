import React, { useState } from 'react';
import { Flex, Text, Input, InputRightElement, InputGroup, IconButton } from '@chakra-ui/core';
import { MdSend } from 'react-icons/md';
import Message from './Message';
import './Chat.css'

const Chat = ({ messages, addMessage }) => {  
    
    const [input, setInput] = useState("");

    const addElement = () => {
        addMessage(input);
        setInput("");
    }

    return (
        <Flex w='100%' border='1px' borderColor='darkColor' h='100%' bg='darkestColor' color='lightColor' direction='column'>
            <Flex h='90%' direction='column'>
                <Flex borderBottom='1px' borderColor='darkColor'>
                    <Text as='span' fontFamily='primary' m='5px' ml='10px'>Chat</Text>
                </Flex>
                <Flex w='100%' direction='column' overflow='auto' className='messages'>
                    {messages.map((each, idx) => (
                        <Message key={idx} name={each.user} self={each.self} message={each.message}></Message>
                    ))}
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
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <InputRightElement h='100%' width='2.5rem'>
                        <IconButton 
                            icon={MdSend} 
                            fontSize='18px' 
                            bg='primaryColor' 
                            color='secondaryColor' 
                            _hover={{ bg: 'lightColor', color: 'darkColor' }} 
                            _active={{ bg: 'white', color: 'darkestColor' }} 
                            cursor='pointer' 
                            isRound 
                            size='sm'
                            onClick={addElement}
                        />
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Flex>
    );
}
export default Chat;
