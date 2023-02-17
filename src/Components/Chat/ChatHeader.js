import { Avatar, Typography } from "@mui/material";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";

function ChatHeader() {
  return (
    <div className="chat-header">
      <div className="header-user-info">
        <Avatar src="https://i.ibb.co/GV4pCwH/IMG-4973-1.png" />
        <Typography>Elvin Shahsuvarli</Typography>
      </div>
      <div className="header-chat-info">
        <BsSearch size={20} />
        <FiMoreVertical size={23} color="#54646f" />
      </div>
    </div>
  );
}

export default ChatHeader;
