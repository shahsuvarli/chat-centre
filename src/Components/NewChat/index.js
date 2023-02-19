import { Avatar, Typography } from "@mui/material";
import React from "react";
import { BsSearch } from "react-icons/bs";
import "./index.css";
import GroupIcon from "@mui/icons-material/Group";
import GroupsIcon from "@mui/icons-material/Groups";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer, selectUser } from "../../store/user";

const news = [
  { icon: <GroupIcon size={23} />, text: "New group" },
  { icon: <GroupsIcon size={23} />, text: "New community" },
];

function NewChat() {
  const [search, setSearch] = React.useState("");
  const { admin, people, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleChat = (person) => {
    dispatch(selectUser(person));
    dispatch(closeDrawer());
  };
  return (
    <div className="newchat-container">
      <div className="search-bar">
        <div className="textbox-container">
          <label htmlFor="search">
            <BsSearch size={20} />
          </label>
          <input
            placeholder="Search contacts"
            value={search}
            name="search"
            id="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="newchat-body">
        {news.map((card, index) => {
          return (
            <div className="newchat-card" key={index}>
              <Avatar
                sx={{ backgroundColor: "#04a784", width: 50, height: 50 }}
              >
                {card.icon}
              </Avatar>
              <Typography>{card.text}</Typography>
            </div>
          );
        })}
        <Typography color={"#04a784"} margin={3}>
          CONTACTS ON WHATSAPP
        </Typography>
        <div className="newchat-card" onClick={() => handleChat(admin)}>
          <Avatar
            sx={{ backgroundColor: "#04a784", width: 50, height: 50 }}
            src={admin.image}
          ></Avatar>
          <div className="new-people-card">
            <Typography>Me (You)</Typography>
            <Typography color={"#667781"} fontSize={15}>
              Message yourself
            </Typography>
          </div>
        </div>
        <Typography color={"#04a784"} margin={3}>
          #
        </Typography>
        {people.map((person) => {
          return (
            <div
              className="newchat-card"
              key={person.id}
              onClick={() => handleChat(person)}
            >
              <Avatar
                sx={{ backgroundColor: "#04a784", width: 50, height: 50 }}
                src={person.image}
              ></Avatar>
              <div className="new-people-card">
                <Typography>
                  {person.name} {person.surname}
                </Typography>
                <Typography color={"#667781"} fontSize={15}>
                  {person.about}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NewChat;