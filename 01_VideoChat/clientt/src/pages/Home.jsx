import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSocket } from "../providers/Socket";

const HomePage = () => {
    const { socket } = useSocket();
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [roomID, setRoomId] = useState();

    const handleRoomJoined = ({ roomId }) => {
        // console.log('Room Joined', roomId);
        navigate(`/room/${roomId}`);
    };

    useEffect(() => {
        socket.on('joined-room', handleRoomJoined);
    }, [socket]);

    const handleJoinRoom = () => {
        socket.emit("join-room", { emailId: email, roomId: roomID });  
    };

    return (
    <div className='homepage-container'>
        <div className='input-container'>
            <input
                value={email}
                onChange={e => setEmail(e.target.value)} 
                type='email' 
                placeholder='Enter email'
            />
            <input
                value={roomID}
                onChange={e => setRoomId(e.target.value)} 
                type='text'
                placeholder='Enter Room Code'
            />
            <button onClick={handleJoinRoom}>Enter Room</button>
        </div>
    </div>
  )
}

export default HomePage; 