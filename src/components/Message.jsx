import React from "react";
import Avatar from "@mui/material/Avatar";
import my_img from "./my_img.jpg";
import MessageBody from "./MessageBody";

const Message = ({ curruser }) => {
  return (
    <div className="message">
      <div className="message_head">
        <Avatar alt="Remy Sharp" src={my_img} />
        <h4 className="hello">{curruser}</h4>
      </div>
      <div className="message_body">
        <MessageBody own={true} />
        <MessageBody own={false} />
        <MessageBody own={true} />
        <MessageBody own={false} />
        <MessageBody own={true} />
        <MessageBody own={false} />
        <MessageBody own={true} />
        <MessageBody own={false} />
        <MessageBody own={true} />
        <MessageBody own={false} />
        <MessageBody own={true} />
        <MessageBody own={false} />
      </div>

      <div className="message_footer">
        <input
          type="text"
          className="send_message"
          placeholder="Message......."
        />
        <button className="send_btn">Send</button>
      </div>
    </div>
  );
};

export default Message;
