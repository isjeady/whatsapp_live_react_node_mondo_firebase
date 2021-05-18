import React from 'react'
import "./Chat.css"
import { IconButton } from "@material-ui/core";
import AttachFile from "@material-ui/icons/AttachFile";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useEffect, useState } from 'react';
import axios from "../axios";
import { useParams } from 'react-router-dom';

const Chat = ({ messages }) => {
    const { roomId } = useParams();
    const [roomName,setRoomName] = useState("");
    const [input,setInput] = useState("");

    useEffect(() => {
        if(roomId){
            axios.get(`/api/v1/rooms/${roomId}`).then((response) => {
                let room = response.data.room
                setRoomName(room && room.name)
            })
        }
    },[roomId])

    const sendMessage = async (e) => {
        e.preventDefault();

        const body = {
            message : input,
            name: "AUTH NAME",
            timestamp : "now",
            received : true
        }

        await axios.post("/api/v1/messages",body).then().catch();
        
        setInput("")
    }

    return (
        <div className="chat">
            <div className="chat__header">

                <div className="chat__header_info">
                    <h3>{roomName}</h3>
                    <p>Visto l'ultima volta...</p>
                </div>

                <div className="chat__header_right">
                   <IconButton>
                    <SearchOutlined></SearchOutlined>
                   </IconButton>
                   <IconButton>
                    <AttachFile></AttachFile>
                   </IconButton>
                   <IconButton>
                    <MoreVert></MoreVert>
                   </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) => {
                    return <div>
                        <p className={`chat__message ${!message.received && "chat__receiver"}`}>
                            <span className="chat__name">{message.name}</span>
                            {message.message}
                            <span className="chat__timestamp">{message.timestamp}</span>
                        </p>
                    </div>
                })}
                
                {/* <p className="chat__message">
                    <span className="chat__name">Jack</span>
                    Message
                    <span className="chat__timestamp">{new Date().toUTCString()}</span>
                </p>
                <p className="chat__message chat__receiver">
                    <span className="chat__name">Jack</span>
                    Message
                    <span className="chat__timestamp">{new Date().toUTCString()}</span>
                </p> */}
            </div>
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>

                <form>
                    <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Scrivi un messaggio..." 
                    type="text"></input>
                    <button 
                    onClick={sendMessage}
                    type="submit"
                    >Invia un Messaggio</button>
                </form>

                <IconButton>
                    <MicIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat