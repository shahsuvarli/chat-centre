import React from "react";
import { MdFilterList } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import { Box } from "@mui/system";
import { Avatar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserChats, handleRightDrawer, selectUser } from "../../store/user";

function MenuBody() {
  const [search, setSearch] = React.useState("");
  const dispatch = useDispatch();
  const { people, admin, userChats, lastMessage } = useSelector((state) => state.user);

  React.useEffect(() => {
    dispatch(getUserChats(admin.id));
  }, [lastMessage]);

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
          .filter((chat) =>
            chat.chat.username
              // .concat(` ${person.surname}`)
              .toLowerCase()
              .includes(search)
          )
          .sort((a, b) => {
            return a.chat.username.localeCompare(b.chat.username);
          })
          // .sort((a, b) => {
          //   return b.messages[b.messages.length - 1].timestamp.localeCompare(
          //     a.messages[a.messages.length - 1].timestamp
          //   );
          // })
          .map((chat) => {
            return (
              <Box
                className="chat-card"
                key={chat.chat.username}
                onClick={() => handleUser(chat.chat.username)}
              >
                <Avatar sx={{ width: 50, height: 50 }} src={chat.chat.image} />
                <div className="menu-chat-body">
                  <div>
                    <Typography variant="body1">
                      {chat.chat.username}
                    </Typography>
                    <Typography color="#677782" fontSize={13}>
                      {/* {person.messages[
                        person.messages.length - 1
                      ].timestamp.slice(11, 16)} */}
                      *time*
                    </Typography>
                  </div>
                  <Typography
                    color="#677782"
                    fontSize={15}
                    variant="body1"
                    className="message"
                    textAlign={"left"}
                  >
                    {/* {person.messages[person.messages.length - 1].text} */}
                    *last message*
                  </Typography>
                </div>
              </Box>
            );
          })}
      </div>
    </div>
  );
}

export default MenuBody;
