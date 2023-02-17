import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { SlPaperClip } from "react-icons/sl";

function ChatFooter() {
    const size=23
  return (
    <div className="chat-footer">
      <BsEmojiSmile color="#54646f" size={size}/>
      <SlPaperClip color="#54646f" size={size} />
      <input type="text" placeholder="Type a message" id="message"/>
      <FaMicrophone color="#54646f" size={size}/>
    </div>
  );
}

export default ChatFooter;
