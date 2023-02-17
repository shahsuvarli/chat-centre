import React, { useEffect } from "react";
import { MdFilterList } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import people from "../../data/people.json";
import { Box } from "@mui/system";
import { Avatar, Typography } from "@mui/material";

function MenuBody() {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    setData(people);
  }, []);
  return (
    <div className="menu-body">
      <div className="search-bar">
        <div className="textbox-container">
          <BsSearch size={20} />
          <input placeholder="Search or start new chat" />
        </div>
        <MdFilterList size={23} />
      </div>
      <div className="chats-container">
        {data.map((person) => {
          return (
            <Box className="chat-card" key={person.id}>
              <Avatar sx={{ width: 50, height: 50 }} src={person.image} />
              <div className="menu-chat-body">
                <Typography variant="body1">
                  {person.name} {person.surname}
                </Typography>
                <Typography color="#677782" variant="body1" className="message">
                  {person.text}
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
