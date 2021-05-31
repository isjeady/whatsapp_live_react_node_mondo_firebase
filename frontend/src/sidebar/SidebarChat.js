import React, { useEffect, useState } from 'react'
import "./SidebarChat.css"
import { Avatar } from "@material-ui/core";
import { Link } from 'react-router-dom';

const SidebarChat = ({room}) => {

    const [seed,setSeed] = useState("");
    const [lastMessage,setLastMessage] = useState("");

    useEffect(() => {
        console.log(room)
        let lMsg = (room?.messages 
            && room.messages[room.messages.length -1] 
            && room.messages[room.messages.length -1].message) || "-" 
        let truncateMessage = lMsg.length > 20 ? `${lMsg.substr(0,20)}...`: lMsg;
        setLastMessage(truncateMessage)
    },[room])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    },[])

    return <Link to={`/rooms/${room._id}`}>
            <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat__info">
                <h2>{room.name}</h2>
                <p>{lastMessage}</p>
            </div>
        </div></Link>
}

export default SidebarChat
