import React from "react";
import { useSelector } from "react-redux";

function ChatBody() {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="chat-body">
      {user.messages.map((message, index) => {
        return (
          <div
            className={`message-container ${message.isSenderMe || "itIsNotMe"}`}
            key={index}
          >
            <span className="message-content">{message.text}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ChatBody;
