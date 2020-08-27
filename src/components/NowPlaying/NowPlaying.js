import React from 'react';
import { Flex, Text, Input, InputRightElement, InputGroup, IconButton, List, ListItem, ListIcon, Box } from '@chakra-ui/core';
import { MdQueue, MdPlayCircleFilled, MdSubdirectoryArrowRight, MdCancel } from 'react-icons/md';
import './NowPlaying.css';
const NowPlaying = (props) => {
    const {queue} = props;
    return (
        <Flex w='100%' h='100%' bg='darkestColor' color='lightColor' direction='column'>
            <Flex>
                <Text as='span' fontFamily='primary' m='10px'>Add to Queue</Text>
            </Flex>
            <Flex>
                <InputGroup w='100%' size='md'>
                    <Input
                        pr='2.5rem'
                        w='100%'
                        placeholder='Paste URL here'
                        bg='darkColor'
                        color='lightColor'
                        border='0'
                        fontFamily='secondary'
                        borderRadius='50rem'
                    />
                    <InputRightElement h='100%' width='2.5rem'>
                        <IconButton icon={MdQueue} fontSize='18px' bg='primaryColor' color='secondaryColor' _hover={{ bg: 'lightColor', color: 'darkColor' }} _active={{ bg: 'white', color: 'darkestColor' }} cursor='pointer' isRound size='sm'/>
                    </InputRightElement>
                </InputGroup>
            </Flex>
            <Flex borderBottom='1px' borderColor='darkColor'>
                <Text as='span' fontFamily='primary' m='5px' ml='10px'>Now Playing</Text>
            </Flex>
            <Flex w='100%' overflow='auto' className='queue'>
                <List spacing={3} pl='10px' w='100%' m='0'>
                    <ListItem w='100%' display='flex'>
                        <Flex w='10%' align='center'><ListIcon icon={MdPlayCircleFilled} color='green.500' /></Flex>
                        <Box w='80%'><Text fontFamily='secondary' isTruncated w='100%'>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Text></Box>
                        <Flex w='10%' align='center'><ListIcon icon={MdCancel} color='red.500' cursor='pointer' /></Flex>
                    </ListItem>
                    <ListItem w='100%' display='flex'>
                        <Flex w='10%' align='center'><ListIcon icon={MdSubdirectoryArrowRight} color='green.500' /></Flex>
                        <Box w='80%'><Text fontFamily='secondary' isTruncated w='100%'>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Text></Box>
                        <Flex w='10%' align='center'><ListIcon icon={MdCancel} color='red.500' cursor='pointer' /></Flex>
                    </ListItem>
                    <ListItem w='100%' display='flex'>
                        <Flex w='10%' align='center'><ListIcon icon={MdSubdirectoryArrowRight} color='green.500' /></Flex>
                        <Box w='80%'><Text fontFamily='secondary' isTruncated w='100%'>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Text></Box>
                        <Flex w='10%' align='center'><ListIcon icon={MdCancel} color='red.500' cursor='pointer' /></Flex>
                    </ListItem>
                    <ListItem w='100%' display='flex'>
                        <Flex w='10%' align='center'><ListIcon icon={MdSubdirectoryArrowRight} color='green.500' /></Flex>
                        <Box w='80%'><Text fontFamily='secondary' isTruncated w='100%'>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Text></Box>
                        <Flex w='10%' align='center'><ListIcon icon={MdCancel} color='red.500' cursor='pointer' /></Flex>
                    </ListItem>
                    <ListItem w='100%' display='flex'>
                        <Flex w='10%' align='center'><ListIcon icon={MdSubdirectoryArrowRight} color='green.500' /></Flex>
                        <Box w='80%'><Text fontFamily='secondary' isTruncated w='100%'>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Text></Box>
                        <Flex w='10%' align='center'><ListIcon icon={MdCancel} color='red.500' cursor='pointer' /></Flex>
                    </ListItem>
                    <ListItem w='100%' display='flex'>
                        <Flex w='10%' align='center'><ListIcon icon={MdSubdirectoryArrowRight} color='green.500' /></Flex>
                        <Box w='80%'><Text fontFamily='secondary' isTruncated w='100%'>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Text></Box>
                        <Flex w='10%' align='center'><ListIcon icon={MdCancel} color='red.500' cursor='pointer' /></Flex>
                    </ListItem>
                </List>
            </Flex>
        </Flex>
    );
}
export default NowPlaying;