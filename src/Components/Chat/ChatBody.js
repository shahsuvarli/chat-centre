import React from "react";
import { useSelector } from "react-redux";

function ChatBody() {
  const {user}=useSelector(state=>state.user)
  return (
    <div className="chat-body">
      {user.messages.map((message, index) => {
        return (
          <div className="message-container" key={index}>
            <span className="message-content">{message}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ChatBody;
