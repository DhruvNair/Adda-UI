import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import config from '../../config/config';
import { promise } from '../../utils/socket-promise';
import { WebRTC } from '../../services/webrtc';
import User from '../../Model/User';

const Dashboard = () => {
    const result = useParams();
    const [users, setUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const [selfUser, setSelfUser] = useState(null);
    const [webrtc, setWebrtc] = useState(null);


    useEffect(() => {
        const socket = io(`${config.host}?meetingId=${result.id}&name=brijesh`);
        socket.request = promise(socket);
        setSocket(socket);
    }, [result]);


    useEffect(() => {
        if (!socket) return; 

        socket.on('connect', async () => {
            console.log('connected');

            const webrtc = new WebRTC(socket, users);

            const data = await socket.request('getRouterCapabilities');
            await webrtc.loadDevice(data);


            const producerTransport = await webrtc.produceTransport();
            const consumerTransport = await webrtc.consumeTransport();

            const user = new User('brijesh', socket.id)
            user.consumeTransport = consumerTransport;
            user.produceTransport = producerTransport;

            setSelfUser(user);
            setWebrtc(webrtc)
        })
        
        socket.on('UserUpdated', (users) => setUsers(users));
    }, [socket]);

    const getAudio = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const track = stream.getAudioTracks()[0];

        const producer = await webrtc.createProducer(track, selfUser.produceTransport);

    }

    return (
        <> 
            {users.map(user => <h2 key={user.id}>{user.name}</h2>)} 
            <div>Hi</div>
            <button onClick={getAudio}>Audio</button>
        </>
    );
}
 
export default Dashboard;