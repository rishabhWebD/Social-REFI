import React from "react";

const MessageBody = ({ own }) => {
  return (
    <div>
      <div className={own ? "msg own" : "msg"}>hy hello world</div>
    </div>
  );
};

export default MessageBody;
