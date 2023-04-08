import { Avatar, Button } from "@mui/material";
import React from "react";
import "./index.css";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { handleLeftDrawer, logout } from "../../store/user";
import GroupsIcon from "@mui/icons-material/Groups";
import { FaSignOutAlt } from "react-icons/fa";

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
        <FaSignOutAlt
          sx={{ color: "#54646f", width: 27, height: 27 }}
          size={size}
          color="#54646f"
          onClick={() => dispatch(logout())}
        />
        <GroupsIcon
          sx={{ color: "#54646f", width: 27, height: 27 }}
          size={size}
          color="#54646f"
          onClick={() => {
            handleDrawer("Communities");
          }}
        />
        <BsFillChatLeftTextFill
          size={size}
          // color="rgb(33, 108, 166)"
          color="#ff6961"
          onClick={() => {
            handleDrawer("New chat");
          }}
        />
        {/* <FiMoreVertical size={size} color="#54646f" /> */}
      </div>
    </div>
  );
}

export default MenuHeader;
