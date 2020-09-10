import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import config from '../../config/config';
import { promise } from '../../utils/socket-promise';
import { WebRTC } from '../../services/webrtc';
import { User, OtherUser } from '../../Model/User';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import FriendsComponent from '../Friends/FriendsComponent';
import NowPlaying from '../NowPlaying/NowPlaying';
import Chat from '../Chat/Chat';
import { Flex, Box } from '@chakra-ui/core';

let socket;
let webrtc;

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [selfUser, setSelfUser] = useState(null);
    const result = useParams();
    const [songs, setSongs] = useState([]);
    const [messages, setMessages] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [nowPlaying, setNowPlaying] = useState('');
    const [currAt, setCurrAt] = useState(0);
    const [isHost, setIsHost] = useState(true);

    useEffect(() => {
        if(songs[0]){
            setNowPlaying(songs[0]);
        } else {
            setNowPlaying('');
        }
    }, [songs])

    useEffect(() => {
        // It's hardcoded to brijesh
        socket = io(`${config.host}?meetingId=${result.id}&name=brijesh`, {
            transports: ["websockets", "polling"]
        });
        socket.request = promise(socket);

        socket.on('connect', async () => {
            const user = new User('brijesh', socket.id)
            webrtc = new WebRTC(socket, users, user);
    
            const data = await socket.request('getRouterCapabilities');
            await webrtc.loadDevice(data);


            const producerTransport = await webrtc.produceTransport();
            const consumerTransport = await webrtc.consumeTransport();

            user.consumeTransport = consumerTransport;
            user.produceTransport = producerTransport;

            setSelfUser(user);

            const userList = await socket.request('getusers', null);
            const prevUsers = userList.map(each => new OtherUser(each.name, each.id));
            setUsers(prevUsers);
        })

        socket.on('UserLeft', ({ id }) => {
            setUsers(prev => prev.filter(user => user.id !== id))
        })

        socket.on('UserAdded', ({ name, id }) => {
            const newUser = new OtherUser(name, id);
            setUsers(prev => [...prev, newUser]);
        })

        socket.on('newProducer', async (data) => {
            const { socketId, kind } = data;
            const consumer = await webrtc.createConsumer(socketId, kind);
    
            setUsers(prev => {
                const otherUsers = prev.filter(each => each.id !== socketId);
                const user = prev.find(ele => ele.id === socketId);

                if (!user) throw new Error("User not found");
                user.consumer = consumer
        
                let stream = new MediaStream();
                stream.addTrack(consumer.track);
    
                user.stream = stream;
                return [...otherUsers, user]
            })
            await socket.request("resume", { consumerId: consumer.id, socketId, kind });
        })

        socket.on('consumerPause', (data) => {
            const { consumerId } = data;
            const consumerObj = users.find(user => user.consumer && user.consumer.id === consumerId);
            if (!consumerObj) return;

            consumerObj.pause();
        })

        socket.on('consumerResume', (data) => {
            const { consumerId } = data;
            const consumerObj = users.find(user => user.consumer && user.consumer.id === consumerId);

            if (!consumerObj) return;

            consumerObj.resume();
        })

        socket.on('messageRecv', ({ message, user }) => {
            setMessages(prevMessages => [...prevMessages, { message, user, self: false }])
        })

    }, [result]);

    const getAudio = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const track = stream.getAudioTracks()[0];

        const producer = await webrtc.createProducer(track, selfUser.produceTransport);
        
        setSelfUser(prev => ({ ...prev, producer, stream }))
    }
    const onPlay = () => {
        console.log('Play');
    }
    const onPause = () => {
        console.log('Pause');
    }
    const onSeek = (time) => {
        console.log('Seeked to ', time);
    }
    const pauseProducer = async() => {
        console.log("Paused Producer");
        try {
            await socket.request('pauseProducer', { producerUserId: socket.id })
            setSelfUser(prev => {
                const producer = prev.producer;
                if (!producer) throw new Error("Producer not found");

                producer.pause();

                const updated = { ...prev };
                updated.producer = producer;

                return updated;
            })
        } catch(e) {
            console.log('lul error');
        }
    }

    const resumeProducer = async() => {
        console.log("Resumed Producer");
        try {
            await socket.request('resumeProducer', { producerUserId: socket.id })
            setSelfUser(prev => {
                const producer = prev.producer;
                if (!producer) throw new Error("Producer not found");

                producer.resume();

                const updated = { ...prev };
                updated.producer = producer;

                return updated;
            })
        } catch(e) {
            console.log('lul error');
        }
    }

    const removeFromQueue = (url) => {
        setSongs(songs => songs.filter(song => song !== url))
    }

    const addToQueue = (url) => {
        setSongs(songs => [...songs, url])
    }

    const addMessage = (text) => {
        setMessages(prevMessages => [...prevMessages, { message: text, user: selfUser.name, self: true }])
        socket.request('messageSend', text)
    }

    const friendsComponent = useMemo(() => <FriendsComponent users={users} selfUser={selfUser} getAudio={getAudio}/>, [users, selfUser]);
    const videoComponent = useMemo(() => <VideoPlayer URL={nowPlaying} playing={playing} currTime={currAt} isHost={isHost} onPlay={onPlay} onPause={onPause} onSeek={onSeek}/>, [nowPlaying, playing, currAt, isHost]);
    const nowPlayingComponent = useMemo(() => <NowPlaying queue={songs} addToQueue={addToQueue} removeFromQueue={removeFromQueue} isHost={isHost} />, [songs, isHost]);
    const messagesComponent = useMemo(() => <Chat messages={messages} addMessage={addMessage}/>, [messages]);

    return (
        <>
            <Flex w='100%' h={window.innerHeight}>
                <Flex direction='column' w='80%' h='100%'>
                    <Box h='80%' w='100%'>
                        {videoComponent}
                    </Box>
                    <Box h='20%' w='100%'>
                        {friendsComponent}
                    </Box>
                </Flex>
                <Flex direction='column' w='20%' h='100%'>
                    <Box h='40%' w='100%'>
                        {nowPlayingComponent}
                    </Box>
                    <Box bg='blue.500' h='60%' w='100%'>
                        {messagesComponent}
                    </Box>
                </Flex>
            </Flex>
            <button disabled={!webrtc} onClick={getAudio}>Audio</button>
            <button disabled={!(selfUser && selfUser.producer && !selfUser.producer.paused)} onClick={pauseProducer}>Pause</button>
            <button disabled={!(selfUser && selfUser.producer && selfUser.producer.paused)} onClick={resumeProducer}>Resume</button>
        </>
    );
}
 
export default Dashboard;