import React, { useEffect } from "react";
import Chat from "../Chat/Chat";
import Menu from "../Menu/Menu";
import LeftDrawer from "../LeftDrawer.js";
import UserCard from "../UserCard/UserCard";
import "./index.css";
import RightDrawer from "../RightDrawer";
import { connect, useDispatch } from "react-redux";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase.js";
import { getUsers, loadChats, loadPeople } from "../../store/user";

function Whatsapp(props) {
  const dispatch = useDispatch();

  // const getUsers = async () => {
  //   const list = [];
  //   const usersRef = await getDocs(collection(db, "users"));
  //   usersRef.forEach((doc) => {
  //     list.push(doc.data());
  //   });
  //   return usersRef;
  // };

  useEffect(() => {
    // getUsers();
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

export default connect(mapStateToProps, null)(Whatsapp);
