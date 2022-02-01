import React, { useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Avatar from "@mui/material/Avatar";
import AddCommentIcon from "@mui/icons-material/AddComment";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import Input from "@mui/material/Input";
import ShareIcon from "@mui/icons-material/Share";

const Posts = ({ username, caption, imgUrl }) => {
  const [comm, setComm] = useState(false);
  const [text, setText] = useState("");
  const handleChange = () => {
    setComm(true);
  };
  const addComment = () => {
    setComm(false);
  };
  return (
    <>
      <div className="content">
        <div className="post">
          <div className="post_header">
            <Avatar alt="Remy Sharp" src="" />
            <h4 className="post_name color">{username}</h4>
          </div>
          <div className="post_body">
            <img src={imgUrl} alt="hello" />
          </div>
          <div className="post_footer">
            <div className="icons">
              <FavoriteBorderOutlinedIcon className="icon" />
              <AddCommentIcon
                className="icon"
                onClick={() => {
                  handleChange();
                }}
              />
              <ShareIcon className="icon" />
              {/* <TurnedInNotIcon/> */}
            </div>
            <div className={comm === false ? "comments" : "comment"}>
              <Input
                placeholder="comments"
                className="Input"
                type="text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <AddCircleIcon className="addComm" onClick={() => addComment()} />
            </div>
            <div className="caption color">
              <strong>{username}</strong>
              <p className="cap">{caption}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
