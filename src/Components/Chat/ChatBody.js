import React from "react";
import messages from "../../data/messages.json";

function ChatBody() {
  return (
    <div className="chat-body">
      {messages.map((message) => {
        return (
          <div className="message-container">
            <span className="message-content">{message.message}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ChatBody;
