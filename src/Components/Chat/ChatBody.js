import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { getMessages } from "../../store/user";
import { Done } from "@mui/icons-material";

function ChatBody() {
  const { selectedChatId, selectedChat, admin, lastMessage } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(getMessages(selectedChatId));
    }, 500);
  }, [selectedChatId, lastMessage]);
  return (
    <div className="chat-body">
      {selectedChat.map((message, index) => {
        return (
          <div
            className={`message-container ${
              message.senderId === admin.id || "itIsNotMe"
            }`}
            key={index}
          >
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-time">
                {message.timestamp.slice(11, 16)}
                {message.read ? (
                  <DoneAllIcon
                    sx={{
                      color: "#53bdea",
                      display: message.senderId === admin.id || "none",
                    }}
                  />
                ) : (
                  <Done
                    sx={{
                      color: "grey",
                      display: message.senderId === admin.id || "none",
                    }}
                  />
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
