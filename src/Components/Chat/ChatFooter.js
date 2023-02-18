import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { SlPaperClip } from "react-icons/sl";
import { IoSend } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../store/user";

function ChatFooter() {
  const size = 23;
  const [message, setMessage] = React.useState("");
  const dispatch = useDispatch();

  const handleSend = () => {
    dispatch(sendMessage(message));
    setMessage("");
  };

  return (
    <div className="chat-footer">
      <BsEmojiSmile color="#54646f" size={size} />
      <SlPaperClip color="#54646f" size={size} />
      <input
        type="text"
        placeholder="Type a message"
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value) {
            handleSend();
          }
        }}
      />
      {message ? (
        <IoSend color={"#54646f"} size={size} onClick={handleSend} />
      ) : (
        <FaMicrophone color="#54646f" size={size} />
      )}
    </div>
  );
}

export default ChatFooter;
