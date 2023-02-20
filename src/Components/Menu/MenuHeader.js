import { Avatar } from "@mui/material";
import React from "react";
import "./index.css";
import { BiLoaderCircle } from "react-icons/bi";
import { BsFillChatLeftTextFill, BsPeopleFill } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { handleLeftDrawer } from "../../store/user";

function MenuHeader() {
  const size = 23;
  const { admin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleDrawer = (name) => {
    dispatch(handleLeftDrawer({ open: true, name }));
  };
  return (
    <div className="menu-header">
      <Avatar src={admin.image} onClick={() => handleDrawer("Profile")} />
      <div className="menu-icons">
        <BsPeopleFill
          size={size}
          color="#54646f"
          onClick={() => {
            handleDrawer("Communities");
          }}
        />
        <BiLoaderCircle
          size={size}
          color="#54646f"
          onClick={() => {
            handleDrawer("Status");
          }}
        />
        <BsFillChatLeftTextFill
          size={size}
          color="#54646f"
          onClick={() => {
            handleDrawer("New chat");
          }}
        />
        <FiMoreVertical size={size} color="#54646f" />
      </div>
    </div>
  );
}

export default MenuHeader;
