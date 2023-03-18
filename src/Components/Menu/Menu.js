import React from "react";
import "./index.css";
import MenuBody from "./MenuBody";
import MenuHeader from "./MenuHeader";

function Menu() {
  return (
    <div className="menu-container">
      <MenuHeader />
      <MenuBody />
    </div>
  );
}

export default Menu;
