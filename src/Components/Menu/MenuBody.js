import React from "react";
import { MdFilterList } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import { Box } from "@mui/system";
import { Avatar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getChats, handleRightDrawer, selectUser } from "../../store/user";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

function MenuBody() {
  const [search, setSearch] = React.useState("");
  const dispatch = useDispatch();
  const { userChats, admin } = useSelector((state) => state.user);

  React.useEffect(() => {
    onSnapshot(collection(db, `users/${admin.id}/messages`), () => {
      dispatch(getChats(admin.id));
    });
  }, []);

  const handleUser = (person) => {
    dispatch(handleRightDrawer({ open: false, name: "" }));
    dispatch(selectUser(person));
  };

  return (
    <div className="menu-body">
      <div className="search-bar">
        <div className="textbox-container">
          <label htmlFor="search">
            <BiSearchAlt2 size={19} color="#54646f" />
          </label>
          <input
            placeholder="Search or start new chat"
            value={search}
            name="search"
            id="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <MdFilterList size={23} color="#54646f" className="icon" />
      </div>
      <div className="chats-container">
        {userChats
          .filter((chat) => chat.message.text !== "")
          .filter((chat) => chat.user.username.toLowerCase().includes(search))
          .sort((a, b) => {
            return a.user.username.localeCompare(b.user.username);
          })
          .sort((a, b) => {
            return b.message.timestamp.localeCompare(a.message.timestamp);
          })
          .map((chat) => {
            return (
              <Box
                className="chat-card"
                key={chat.user.email}
                onClick={() => handleUser(chat.user)}
              >
                <Avatar sx={{ width: 50, height: 50 }} src={chat.user.image} />
                <div className="menu-chat-body">
                  <div>
                    <Typography variant="body1">
                      {chat.user.username}
                    </Typography>
                    <Typography color="#677782" fontSize={13}>
                      {chat.message.timestamp.slice(11, 16)}
                    </Typography>
                  </div>
                  <Typography
                    color="#677782"
                    fontSize={15}
                    variant="body1"
                    className="message"
                    textAlign={"left"}
                  >
                    {chat.message.text}
                  </Typography>
                </div>
              </Box>
            );
          })}
        <div className="no-chat-display">
          You can always click &nbsp;
          <BsFillChatLeftTextFill size={20} />
          &nbsp; icon on top and find new people to chat!
        </div>
      </div>
    </div>
  );
}

export default MenuBody;
