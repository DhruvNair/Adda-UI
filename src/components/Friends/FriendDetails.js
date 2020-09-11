import React from 'react';
import { Flex, Text, IconButton, Icon, Box } from '@chakra-ui/core';
import { MdMic, MdMicOff } from 'react-icons/md'

const FriendDetails = (props) => {
    let {user, editable, getAudio} = props;
    let audioIcon = editable ? (user && user.producer && !user.producer.paused ? MdMic : MdMicOff) : (user && user.consumer && !user.consumer.paused ? MdMic : MdMicOff) ;

    const setSrcObject = (ref, stream) => {
        if (ref && stream) ref.srcObject = stream;
    }

    if(user) {
        return(
            <Flex h='100%' w='100px' align='center' direction='column'>
                {(user && user.consumer) ? <audio ref={ref => setSrcObject(ref, user.stream)} src={user.stream} autoPlay></audio> : <></>}
                <Flex w='60px' h='60px' borderRadius='100%' position='relative' bg='primaryColor' color='secondaryColor' align='center' justify='center'>
                    <Text as='span' fontFamily='secondary' fontSize='30px'>{user ? user.name[0] : '?'}</Text>
                    { editable ?
                        <IconButton onClick={getAudio} as='div' isRound size='xs' position='absolute' bottom='0' right='0' cursor='pointer' aria-label='Toggle microphone' variantColor='teal' variant='ghost' fontSize='18px' icon={audioIcon}/> :
                        <Box w='24px' h='24px' position='absolute' bottom='0' right='0'><Icon as={audioIcon} color='teal.500' fontSize='18px'/></Box>
                    }
                </Flex>
                <Flex mt='10px'>
                    <Text as='span' fontFamily='secondary'>{user ? user.name : 'Loading'}</Text>
                </Flex>
            </Flex>
        );
    } else {
        return(<></>)
    }
}
FriendDetails.defaultProps = {
    editable: false
}

export default FriendDetails;