import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import axios from "../axios";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

function SidebarChat({ room }) {
  const [seed, setSeed] = useState("");
  const [{ rooms: roomsState }, dispatch] = useStateValue();

  const getMyRoomNotify = () => {
    let r = roomsState.find((item) => item._id === room._id);
    return r?.notify;
  };

  const getMyRoomLastMessage = () => {
    let r = roomsState.find((item) => item._id === room._id);
    return r?.lastMessage;
  };

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomsState]);

  return (
    <Link to={`/rooms/${room._id}`}>
      <div className="sidebarChat">
        <div className="sidebarChat__left">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="sidebarChat__info">
            <h2>{room && room.name}</h2>
            <p>{getMyRoomLastMessage()}</p>
          </div>
        </div>
        {getMyRoomNotify() > 0 ? (
          <div className="sidebarChat__right">
            <p>
              {getMyRoomNotify() == 1 ? (
                <NotificationsIcon></NotificationsIcon>
              ) : (
                ""
              )}
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
}

export default SidebarChat;
