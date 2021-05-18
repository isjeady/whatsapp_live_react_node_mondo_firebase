import React from 'react'
import "./Sidebar.css"
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from './SidebarChat';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__header_left">
                    <IconButton>
                          <Avatar src="data:image/jpeg;base64,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"></Avatar>
                    </IconButton>
                </div>
                <div className="sidebar__header_right">
                <IconButton>
                    <DonutLargeIcon></DonutLargeIcon>
                </IconButton>
                <IconButton>
                    <ChatIcon></ChatIcon>
                </IconButton>
                <IconButton>
                    <MoreVertIcon></MoreVertIcon>
                </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__search_container">
                    <SearchOutlined></SearchOutlined>
                    <input 
                    placeholder="Cerca o inizia una nuova chat"
                    type="text"
                    ></input>
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar
