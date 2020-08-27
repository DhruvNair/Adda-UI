import React from 'react';
import { Flex, Text } from '@chakra-ui/core';

const Message = (props) => {
    const {name, message, self} = props;
    return (
        <Flex w='100%' bg={self ? 'primaryColor' : 'darkColor'} color={self ? 'secondaryColor' : 'lightColor'} p='5px' justify='space-between' align='baseline'>
            <Text fontFamily='primary' whiteSpace='nowrap' maxW='30%' isTruncated>
                {name + ' :'}&nbsp;
            </Text>
            <Text fontFamily='secondary' textAlign='right' maxW='70%'>
                {' ' + message}
            </Text>
        </Flex>
    );
}

export default Message;