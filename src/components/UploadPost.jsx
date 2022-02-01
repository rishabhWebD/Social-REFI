import React, { useState } from "react";
import { db, storage } from "../firebase";
import firebase from "firebase";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Modal from "@mui/material/Modal";

const UploadPost = ({ username }) => {
  const [caption, setCaption] = useState("");
  const [img, setImg] = useState(null);
  const [o, setO] = useState(false);
  const [progress, setProgress] = useState(0);
  // var task = new FirebaseStorage("newproject-be92d.appspot.com")
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${img.name}`).put(img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //   console.error(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(img.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imgurl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImg(null);
            if (progress === 0) {
              setO(false);
            }
          });
      }
    );
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Modal open={o} onClose={() => setO(false)}>
        <Box sx={style}>
          <center>
            <Box sx={{ width: "50%" }}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>

            <br />
            <Input
              type="text"
              value={caption}
              placeholder="Enter A Caption"
              onChange={(e) => setCaption(e.target.value)}
            />
            <br />
            <Input className="b" type="file" onChange={handleChange} />
            <br />
            <Button className="btn4" onClick={handleUpload}>
              Upload
            </Button>
          </center>
        </Box>
      </Modal>
      <Button
        variant="outlined"
        color="error"
        className="btn5"
        onClick={() => setO(true)}
      >
        New post
      </Button>
    </div>
  );
};

export default UploadPost;
