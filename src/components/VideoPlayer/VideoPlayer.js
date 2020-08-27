import React, { useState, useRef } from 'react';
import { Box } from '@chakra-ui/core';
import ReactPlayer from 'react-player';
import { findDOMNode } from 'react-dom';
import screenfull from 'screenfull';

const VideoPlayer = (props) => {
    const playerRef = useRef();
    const URLInputRef = useRef();
    const [playing, setPlaying] = useState(false);
    const [currTime, setCurrTime] = useState(0);
    const [pendingUpdate, setPendingUpdate] = useState(false);
    const [URL, setURL] = useState('https://www.twitch.tv/videos/612977898');

    const toggleVideo = () => {
        setPlaying(!playing)
    }

    const seek = () => {
        console.log(playerRef.current.getCurrentTime())
        seekTo(20)
    }

    const seekTo = (time) => {
        if (playing) {
          playerRef.current.seekTo(currTime, "seconds")
        } else {
          setCurrTime(time)
          setPendingUpdate(true)
        }
    }

    const syncTime = () => {
        playerRef.current.seekTo(currTime, "seconds")
        setPendingUpdate(false);
    }

    const playHandler = () => {
        if (pendingUpdate) {
          syncTime()
        }
        setPlaying(true)
    }

    const pauseHandler = () => {
        setPlaying(false)
    }

    const showText = () => {
        if (ReactPlayer.canPlay(URLInputRef.current.value)){
          setURL(URLInputRef.current.value)
        }
        URLInputRef.current.value = '';
    }

    const goFullScreen = () => {
        if(playing){
            screenfull.request(findDOMNode(playerRef.current))
        }
    }

    return (
        <Box w='100%' h='100%' pos='relative'>
            <Box onDoubleClick={goFullScreen} bg='transparent' pos='absolute' top='0' left='0' w='100%' h='100%'></Box>
            <ReactPlayer width='100%' height='100%' onPlay={playHandler} onPause={pauseHandler} playing={playing} ref={playerRef} url={URL} />
            {/* <button onClick={toggleVideo}>Toggle</button>
            <button onClick={seek}>Seek</button><br/>
            <input type="text" ref={URLInputRef}/>
            <button onClick={showText}>Show me</button><br/>
            <button onClick={goFullScreen}>FullScreen</button> */}
        </Box>
    );
}

export default VideoPlayer;