import React from 'react'
import "./Chat.css"
import { IconButton } from "@material-ui/core";
import AttachFile from "@material-ui/icons/AttachFile";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";

const Chat = () => {
    return (
        <div className="chat">
            <div className="chat__header">

                <div className="chat__header_info">
                    <h3>Chat Name</h3>
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
                
                <p className="chat__message">
                    <span className="chat__name">Jack</span>
                    Message
                    <span className="chat__timestamp">{new Date().toUTCString()}</span>
                </p>
                <p className="chat__message chat__receiver">
                    <span className="chat__name">Jack</span>
                    Message
                    <span className="chat__timestamp">{new Date().toUTCString()}</span>
                </p>
            </div>
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>

                <form>
                    <input placeholder="Scrivi un messaggio..." type="text"></input>
                    <button type="submit">Invia un Messaggio</button>
                </form>

                <IconButton>
                    <MicIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat