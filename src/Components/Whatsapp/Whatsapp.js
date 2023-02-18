import React from "react";
import Chat from "../Chat/Chat";
import TemporaryDrawer from "../Drawer.js";
import Menu from "../Menu/Menu";
import UserCard from "../UserCard/UserCard";
import "./index.css";

function Whatsapp() {
  return (
    <div className="app">
      <TemporaryDrawer />
      <Menu />
      <Chat />
      <UserCard />
    </div>
  );
}

export default Whatsapp;
