import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import config from '../../config/config';
import * as mediasoupClient from 'mediasoup-client';
import { promise } from '../../utils/socket-promise';
import { WebRTC } from '../../services/webrtc';

const Dashboard = () => {
    const result = useParams();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const socket = io(`${config.host}?meetingId=${result.id}&name=brijesh`);
        socket.request = promise(socket);
        
        socket.on('connect', () => {
            console.log('connected');
        })
        
        
        socket.on('UserUpdated', (users) => setUsers(users));
        
        const handleMSStuff = async() => {
            const webrtc = new WebRTC(socket, users);
            
            await socket.request('getRouterCapabilities');
            
            
        }

        handleMSStuff();
        return () => {

        };
    }, [result]);



    useEffect(() => {
        

    

    }, []);


    return (
        <> 
            {users.map(user => <h2 key={user.id}>{user.name}</h2>)} 
            <div>Hi</div>
        </>
    );
}
 
export default Dashboard;