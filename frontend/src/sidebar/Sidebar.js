import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLarge from "@material-ui/icons/DonutLarge";
import MoreVert from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { Avatar, IconButton } from "@material-ui/core";
import axios from "../axios";
import { useStateValue } from "../StateProvider";
import Pusher from "pusher-js";
import { actionTypes } from "../reducer";
import { useParams } from "react-router-dom";

function Sidebar() {
  const [{ user, rooms }, dispatch] = useStateValue();
  const { roomId } = useParams();

  const createChat = async () => {
    const roomName = prompt("Inserisci un nome per la Chat");

    if (roomName) {
      await axios
        .post("/api/v1/rooms", {
          name: roomName,
        })
        .then((response) => {
          let room = response.data;

          dispatch({
            type: actionTypes.SET_ROOM,
            _id: room._id,
            name: room.name,
            lastMessage: "-",
            notify: 0,
          });
        });
    }
  };

  useEffect(() => {
    axios.get("/api/v1/rooms").then((response) => {
      let rooms = response.data;
      rooms.forEach((room) => {
        let lMsg =
          (room?.messages &&
            room.messages[room.messages.length - 1] &&
            room.messages[room.messages.length - 1].message) ||
          "-";

        dispatch({
          type: actionTypes.SET_ROOM,
          _id: room._id,
          name: room.name,
          lastMessage: lMsg,
          notify: 0,
        });
      });
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("0fa673c36c12981b5555", {
      cluster: "eu",
    });

    rooms.forEach((room) => {
      let channelName = `room_${room._id}`;
      if (roomId != room._id) {
        console.log("channelName: " + channelName);
        console.log("roomIdParams: " + roomId);
        pusher.subscribe(channelName);
      } else {
        pusher.unsubscribe(channelName);
      }
    });

    pusher.bind("inserted", (newMessage) => {
      dispatch({
        type: actionTypes.SET_ROOM,
        _id: newMessage.room_id,
        notify: roomId !== newMessage.room_id ? 1 : 0,
        lastMessage: newMessage?.message,
      });
    });
  }, [roomId,rooms,dispatch]);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__header_left">
          <IconButton>
            <Avatar src={user?.photoURL}></Avatar>
          </IconButton>
          {user?.displayName}
        </div>
        <div className="sidebar__header_right">
          <IconButton>
            <DonutLarge></DonutLarge>
          </IconButton>
          <IconButton>
            <ChatIcon></ChatIcon>
          </IconButton>
          <IconButton>
            <MoreVert></MoreVert>
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

        {rooms.map((room, i) => (
          <SidebarChat key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
