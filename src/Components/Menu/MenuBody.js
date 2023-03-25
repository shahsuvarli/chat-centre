import React from "react";
import { MdFilterList } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import { Box } from "@mui/system";
import { Avatar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleRightDrawer, selectUser } from "../../store/user";

function MenuBody() {
  const [search, setSearch] = React.useState("");
  const dispatch = useDispatch();
  const { people } = useSelector((state) => state.user);

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
        {people
          .filter((person) =>
            person.username
              // .concat(` ${person.surname}`)
              .toLowerCase()
              .includes(search)
          )
          .sort((a, b) => {
            return a.username.localeCompare(b.username);
          })
          // .sort((a, b) => {
          //   return b.messages[b.messages.length - 1].timestamp.localeCompare(
          //     a.messages[a.messages.length - 1].timestamp
          //   );
          // })
          .map((person) => {
            return (
              <Box
                className="chat-card"
                key={person.id}
                onClick={() => handleUser(person)}
              >
                <Avatar sx={{ width: 50, height: 50 }} src={person.image} />
                <div className="menu-chat-body">
                  <div>
                    <Typography variant="body1">{person.username}</Typography>
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
                    {/* {person.messages[person.messages.length - 1].text} */}{" "}
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
