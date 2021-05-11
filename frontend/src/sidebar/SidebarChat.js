import React from 'react'
import "./SidebarChat.css"
import { Avatar } from "@material-ui/core";

const SidebarChat = () => {
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat__info">
                <h2>Name</h2>
                <p>Message</p>
            </div>
        </div>
    )
}

export default SidebarChat
