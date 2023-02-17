import { Avatar } from "@mui/material";
import React from "react";
import "./index.css";
import { BiLoaderCircle } from "react-icons/bi";
import { BsFillChatLeftTextFill, BsPeopleFill } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";

function MenuHeader() {
  const size = 23;
  return (
    <div className="menu-header">
      <Avatar src="https://i.ibb.co/GV4pCwH/IMG-4973-1.png" />
      <div className="menu-icons">
        <BsPeopleFill size={size} color="#54646f" />
        <BiLoaderCircle size={size} color="#54646f" />
        <BsFillChatLeftTextFill size={size} color="#54646f" />
        <FiMoreVertical size={size} color="#54646f" />
      </div>
    </div>
  );
}

export default MenuHeader;
