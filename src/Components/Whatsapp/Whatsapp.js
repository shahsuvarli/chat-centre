import React from "react";
import Chat from "../Chat/Chat";
import Menu from "../Menu/Menu";
import LeftDrawer from "../LeftDrawer.js";
import UserCard from "../UserCard/UserCard";
import "./index.css";
import RightDrawer from "../RightDrawer";

function Whatsapp() {
  return (
    <div className="app">
      <LeftDrawer />
      <RightDrawer/>
      <Menu />
      <Chat />
      <UserCard />
    </div>
  );
}

export default Whatsapp;
