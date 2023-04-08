import React, { useEffect } from "react";
import Chat from "../Chat/Chat";
import Menu from "../Menu/Menu";
import LeftDrawer from "../LeftDrawer.js/index.js";
import UserCard from "../UserCard/UserCard";
import "./index.css";
import RightDrawer from "../RightDrawer";
import { connect, useDispatch } from "react-redux";
import { getUsers } from "../../store/user";

function ChatCentre(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className="app">
      <LeftDrawer />
      <RightDrawer />
      <Menu />
      <Chat />
      <UserCard />
    </div>
  );
}

const mapStateToProps = (state) => {
  return state.user.admin;
};

export default connect(mapStateToProps, null)(ChatCentre);
