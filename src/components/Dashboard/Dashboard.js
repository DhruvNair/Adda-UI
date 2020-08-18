import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import config from '../../config/config';
import { promise } from '../../utils/socket-promise';
import { WebRTC } from '../../services/webrtc';
import { User, OtherUser } from '../../Model/User';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const [selfUser, setSelfUser] = useState(null);
    const [webrtc, setWebrtc] = useState(null);
    const result = useParams();

    // Temp
    const [stream, setStream] = useState(null);

    useEffect(() => {
        // It's hardcoded to brijesh
        const socket = io(`${config.host}?meetingId=${result.id}&name=brijesh`);
        socket.request = promise(socket);
        setSocket(socket);
    }, []);

    useEffect(() => {
        if (!socket) return;
        let webrtc = null;
        
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
            setWebrtc(webrtc)
        })

        socket.on('UserLeft', ({ id }) => {
            const remainingUsers = users && users.filter(user => user.id !== id);
            setUsers(remainingUsers);            
        });

        socket.on('UserAdded', ({ name, id }) => {
            const oldusers = [...users];
            const updatedusers = [...oldusers, new OtherUser(name, id)]
            setUsers(updatedusers);            
        })

        socket.on('newProducer', async (data) => {
            const { socketId, kind } = data;

            const consumer = await webrtc.createConsumer(socketId, kind);

            console.log(socketId, users);

            const user = users.find(ele => ele.id === socketId);
            if (!user) throw new Error("User not found");
            user.consumers.push(consumer);


            let stream = new MediaStream();
            stream.addTrack(consumer.track);
            
            document.querySelector('audio').srcObject = stream;

            await socket.request("resume", { consumerId: consumer.id, socketId, kind });
        })

    }, [socket]);


    const getAudio = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const track = stream.getAudioTracks()[0];

        const producer = await webrtc.createProducer(track, selfUser.produceTransport);
        selfUser.producer = producer;
    }

    console.log(users);

    return (
        <> 
            <audio id="hella" autoPlay={true}></audio>
            {users.map(user => <h2 key={user.id}>{user.name}</h2>)} 
            <div>Hi</div>
            <button disabled={!webrtc} onClick={getAudio}>Audio</button>
        </>
    );
}
 
export default Dashboard;