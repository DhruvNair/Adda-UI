import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import config from '../../config/config';
import { promise } from '../../utils/socket-promise';
import { WebRTC } from '../../services/webrtc';
import { User, OtherUser } from '../../Model/User';

let socket;
let webrtc;

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [selfUser, setSelfUser] = useState(null);
    const result = useParams();

    useEffect(() => {
        // It's hardcoded to brijesh
        socket = io(`${config.host}?meetingId=${result.id}&name=brijesh`, {
            transports: ["websockets", "polling"]
        });
        socket.request = promise(socket);
    }, [result]);


    useEffect(() => {
        if (!socket) return;
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

                // This works (but not the correct way)
                document.querySelector('audio').srcObject = user.stream;

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

    }, [socket]);

    console.log(webrtc, "WWEEEEBBBBB");

    const getAudio = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const track = stream.getAudioTracks()[0];

        const producer = await webrtc.createProducer(track, selfUser.produceTransport);
        
        setSelfUser(prev => {
            const updated = { ...prev }
            updated.producer = producer;
            return updated;
        })
    }

    const pauseProducer = async() => {
        
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

    console.log(users);

    return (
        <> 
            <audio id="hella" autoPlay={true}></audio>
            <h1>{socket && socket.id}</h1>
            {users && users.map(user => {
                return (
                    <div key={user.id}>
                        <h2 key={user.id}>{user.name + '    '}{user.id}</h2>
                        {/* 
                            Correct way, but not working
                            <audio src={user.stream} autoPlay={true}></audio> 
                        */}
                    </div>
                )
            })} 
            <div>Hi</div>
            <button disabled={!webrtc} onClick={getAudio}>Audio</button>
            <button disabled={!(selfUser && selfUser.producer && !selfUser.producer.paused)} onClick={pauseProducer}>Pause</button>
            <button disabled={!(selfUser && selfUser.producer && selfUser.producer.paused)} onClick={resumeProducer}>Resume</button>
        </>
    );
}
 
export default Dashboard;