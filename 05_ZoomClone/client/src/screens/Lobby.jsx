import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = () => {
  const [email, setEmail] = useState('');
  const [room, setRoom] = useState('');

  const socket = useSocket();
  // console.log(socket);
  const navigate = useNavigate();

  const handleSubmitForm = useCallback((e) => {
    e.preventDefault();
    // console.log(email, room);
    socket.emit('room:join', { email, room })
  }, [email, room, socket]);

  const handleJoinRoom = useCallback((data) => {
    const {email, room} = data;
    // console.log(email, room); 
    navigate(`/room/${room}`);   
  }, [navigate])

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    }
  }, [socket, handleJoinRoom]);

  return (
    <div>
        <h1>Lobby</h1>
        <form onSubmit={handleSubmitForm}>
          <label htmlFor='email'>Email-id</label>
          <input 
            id='email' 
            type='email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> 
          <br />
          <label htmlFor='room'>Room Id</label>
          <input 
            id='room' 
            type='text' 
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <br />
          <button> Join </button>
        </form>
    </div>
  )
}

export default LobbyScreen;
