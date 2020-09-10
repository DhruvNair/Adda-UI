import React, { useState, useRef } from 'react';
import { Box, Stack, Image, Text } from '@chakra-ui/core';
import ReactPlayer from 'react-player';
import { findDOMNode } from 'react-dom';
import screenfull from 'screenfull';
import EmptyQueue from '../../assets/empty.svg';

const VideoPlayer = (props) => {
    const playerRef = useRef();
    const {playing, currTime, URL, onPlay, onPause, onSeek} = props;
    const [pendingUpdate, setPendingUpdate] = useState(false);

    const seek = () => {
        console.log(playerRef.current.getCurrentTime())
        seekTo(20)
    }

    const seekTo = (time) => {
        if (playing) {
          playerRef.current.seekTo(currTime, "seconds")
        } else {
        //   setCurrTime(time)
          setPendingUpdate(true)
        }
    }

    const syncTime = () => {
        playerRef.current.seekTo(currTime, "seconds")
        setPendingUpdate(false);
    }

    // const playHandler = () => {
    //     if (pendingUpdate) {
    //       syncTime()
    //     }
    //     setPlaying(true)
    // }

    // const pauseHandler = () => {
    //     setPlaying(false)
    // }

    const goFullScreen = () => {
        if(playing){
            screenfull.request(findDOMNode(playerRef.current))
        }
    }

    return (
        <Box w='100%' h='100%' pos='relative'>
            <Box onDoubleClick={goFullScreen} bg='transparent' pos='absolute' top='0' left='0' w='100%' h='100%' zIndex='2'></Box>
            <Box pos='absolute' top='0' left='0' w='100%' h='100%' zIndex='1'>
                <ReactPlayer width='100%' height='100%' onPlay={onPlay} onPause={onPause} onSeek={onSeek} playing={playing} ref={playerRef} url={URL} />
            </Box>
            <Stack bg='#0b1c20' align='center' justify='center' w='100%' h='100%' spacing={8} pos='absolute' top='0' left='0' zIndex='0'>
                <Image w='30%' src={EmptyQueue}></Image>
                <Text color='lightColor' fontFamily='primary' fontSize='32px'>Add some videos to the queue to start watching!</Text>
            </Stack>
            {/* <button onClick={toggleVideo}>Toggle</button>
            <button onClick={seek}>Seek</button><br/>
            <input type="text" ref={URLInputRef}/>
            <button onClick={showText}>Show me</button><br/>
            <button onClick={goFullScreen}>FullScreen</button> */}
        </Box>
    );
}

export default VideoPlayer;