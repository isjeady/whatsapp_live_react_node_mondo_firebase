import React, { useEffect, useState } from 'react'
import "./SidebarChat.css"
import { Avatar } from "@material-ui/core";

const SidebarChat = ({addNewChat}) => {

    const [seed,setSeed] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    },[])

    const createChat = () => {
        const roomName = prompt("Inserisci un nome per la Chat!")

        if(roomName){
            //TODO da fare prossimamente
        }
    }

    return !addNewChat ? (
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat__info">
                <h2>Name : {JSON.stringify(seed)}</h2>
                <p>Message</p>
            </div>
        </div>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h3>Add New Chat</h3>
        </div>
    )
}

export default SidebarChat
