import { Avatar, Typography } from "@mui/material";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { hanldeInfo } from "../../store/user";

function ChatHeader() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(hanldeInfo(true));
  };
  return (
    <div className="chat-header" onClick={handleOpen}>
      <div className="header-user-info">
        <Avatar src={user.image} />
        <Typography>
          {user.name} {user.surname}
        </Typography>
      </div>
      <div className="header-chat-info">
        <BsSearch size={20} />
        <FiMoreVertical size={23} color="#54646f" />
      </div>
    </div>
  );
}

export default ChatHeader;
