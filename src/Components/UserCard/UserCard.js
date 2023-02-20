import React from "react";
import { useSelector } from "react-redux";
import "./index.css";

function UserCard() {
  const { rightDrawer } = useSelector((state) => state.user);

  return (
    <div className={`${rightDrawer.open || "closed"} usercard-container`}></div>
  );
}

export default UserCard;
