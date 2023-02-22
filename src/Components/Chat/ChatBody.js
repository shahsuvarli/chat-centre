import React from "react";
import { useSelector } from "react-redux";
import DoneAllIcon from "@mui/icons-material/DoneAll";

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
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-time">
                {message.timestamp.slice(11, 16)}
                {message.isSenderMe ? (
                  <DoneAllIcon
                    sx={{ width: 15, height: 15, color: "#53bdea" }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatBody;
