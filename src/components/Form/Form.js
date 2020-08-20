import React, { useState } from 'react';
import axios from '../../services/axios';
import { Redirect } from 'react-router-dom';

const Form = () => {
    const [meetingName, setMeetingName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [meetingId, setMeetingId] = useState(null);

    const handleUpdate = (value) => setMeetingName(value)

    const createMeeting = async () => {
        try {
            const res = await axios.post('/', {
                name: meetingName
            })
            setMeetingId(res.data);
            setSubmitted(true);
        } catch(e) {

        }
    }

    if (submitted) return <Redirect to={`/${meetingId}`}/>

    return (  
        <>
            <div>Form</div>
            <h3>meeting name</h3>
            <input value={meetingName} type="text" name="meeting" onChange={(e) => handleUpdate(e.target.value)} />
            <button onClick={createMeeting}>Submit</button>
        </>
    );
}
 
export default Form;