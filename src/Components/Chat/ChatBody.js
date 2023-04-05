import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { getMessages } from "../../store/user";
import { Done } from "@mui/icons-material";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";

function ChatBody() {
  const { selectedChatId, selectedChat, admin, user } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      const q = query(
        collection(db, "userChat", admin.id, 'messages'),
        where("user", "==", user)
      );
      onSnapshot(q, (doc) => {
        doc.forEach(() => {
          dispatch(getMessages(selectedChatId));
        });
      });
    }, 200);
  }, [selectedChatId]);

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
