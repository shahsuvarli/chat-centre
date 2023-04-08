import React from "react";
import "./index.css";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import ChatBody from "./ChatBody";
import { useSelector } from "react-redux";

function Chat() {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="chat-container">
      {user ? (
        <div className="chat-subcontainer">
          <ChatHeader />
          <ChatBody />
          <ChatFooter />
        </div>
      ) : (
        <div className="newpage-container">
          <img
            src={require("../../images/back1.png")}
            style={{filter: 'grayscale(10%)', opacity:0.5}}
            width="100%"
            height={'100%'}
            alt="new"
          />
        </div>
      )}
    </div>
  );
}

export default Chat;
