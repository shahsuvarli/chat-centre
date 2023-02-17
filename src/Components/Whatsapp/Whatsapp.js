import React from "react";
import Chat from "../Chat/Chat";
import Menu from "../Menu/Menu";
import UserCard from "../UserCard/UserCard";
import './index.css'

function Whatsapp() {
  return (
    <div className="app">
      <Menu />
      <Chat />
      <UserCard/>
    </div>
  );
}

export default Whatsapp;
