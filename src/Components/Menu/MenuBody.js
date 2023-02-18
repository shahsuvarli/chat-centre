import React from "react";
import { MdFilterList } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { Box } from "@mui/system";
import { Avatar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user";

function MenuBody() {
  const [search, setSearch] = React.useState("");
  const dispatch = useDispatch();
  const { people } = useSelector((state) => state.user);

  const handleUser = (person) => {
    dispatch(selectUser(person));
  };

  return (
    <div className="menu-body">
      <div className="search-bar">
        <div className="textbox-container">
          <label htmlFor="search">
            <BsSearch size={20} />
          </label>
          <input
            placeholder="Search or start new chat"
            value={search}
            name="search"
            id="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <MdFilterList size={23} />
      </div>
      <div className="chats-container">
        {people
          .filter((person) =>
            person.name
              .concat(` ${person.surname}`)
              .toLowerCase()
              .includes(search)
          )
          .map((person) => {
            return (
              <Box
                className="chat-card"
                key={person.id}
                onClick={() => handleUser(person)}
              >
                <Avatar sx={{ width: 50, height: 50 }} src={person.image} />
                <div className="menu-chat-body">
                  <Typography variant="body1">
                    {person.name} {person.surname}
                  </Typography>
                  <Typography
                    color="#677782"
                    variant="body1"
                    className="message"
                    textAlign={"left"}
                    fontSize={15}
                  >
                    {person.messages[person.messages.length - 1]}
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
