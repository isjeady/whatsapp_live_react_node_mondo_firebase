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
import { useHistory, useParams } from 'react-router-dom';
import { useStateValue } from '../StateProvider';

const Chat = ({ messages }) => {
    const { roomId } = useParams();
    const [roomName,setRoomName] = useState("");
    const [lastSeen,setLastSeen] = useState("");
    const [input,setInput] = useState("");
    const history = useHistory();
    const [{user},dispatch] = useStateValue();

    useEffect(() => {
        if(roomId){
            axios.get(`/api/v1/rooms/${roomId}`).then((response) => {
                let room = response.data.room
                setRoomName(room && room.name)
                let lastMessage = messages[messages.length -1];
                setLastSeen(lastMessage?.timestamp)
            })
            .catch((error) => {
                setLastSeen("")
                setRoomName("")
                history.push("/");
            })
        }
    },[roomId,messages])

    const sendMessage = async (e) => {
        e.preventDefault();

        const body = {
            message : input,
            name: user?.displayName,
            timestamp : new Date(),
            uid : user?.uid,
        }

        await axios.post("/api/v1/messages",body).then().catch();
        
        setInput("")
    }

    return (
        <div className="chat">
            <div className="chat__header">

                <div className="chat__header_info">
                    <h3>{roomName}</h3>
                    <p>
                        Visto l'ultima volta {new Date(lastSeen).toLocaleString()}</p>
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
                        <p className={`chat__message ${message.uid === user?.uid && "chat__receiver"}`}>
                            <span className="chat__name">{message.name}</span>
                            {message.message}
                            <span className="chat__timestamp">{new Date(message.timestamp).toLocaleString()}</span>
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