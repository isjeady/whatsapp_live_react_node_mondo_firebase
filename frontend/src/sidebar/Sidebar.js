import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from './SidebarChat';
import axios from "../axios";
import { useStateValue } from '../StateProvider';

const Sidebar = () => {

    const [rooms,setRooms] = useState([]);
    const [{user},dispatch] = useStateValue();

    useEffect(() => {
        axios.get("/api/v1/rooms/sync").then((response) => {
            // alert(JSON.stringify(response.data))
            setRooms(response.data)
        })
    },[])

    const createChat = async () => {
        const roomName = prompt("Inserisci un nome per la Chat!")

        if(roomName){
            await axios.post("/api/v1/rooms",{
                name : roomName
            }).then((response) => {
                setRooms([...rooms, response.data])
            })
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__header_left">
                    <IconButton>
                          <Avatar src={user.photoURL}></Avatar>
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
                <div onClick={createChat} className="sidebarChat">
                    <h3>Add New Chat</h3>
                </div>

                {rooms.map((room,index) => {
                    return <SidebarChat key={index} room={room} />
                })}
            </div>
        </div>
    )
}

export default Sidebar
