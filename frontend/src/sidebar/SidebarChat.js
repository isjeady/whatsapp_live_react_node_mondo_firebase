import React, { useEffect, useState } from 'react'
import "./SidebarChat.css"
import { Avatar } from "@material-ui/core";
import { Link } from 'react-router-dom';

const SidebarChat = ({room}) => {

    const [seed,setSeed] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    },[])

    return <Link to={`/rooms/${room._id}`}>
            <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat__info">
                <h2>{room.name}</h2>
                <p>Message</p>
            </div>
        </div></Link>
}

export default SidebarChat
