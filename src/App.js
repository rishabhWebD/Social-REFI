import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Modal from "@mui/material/Modal";
import UploadPost from "./components/UploadPost";
import "./App.css";
import Header from "./components/Header";
import Post from "./components/Posts";
import { db, auth } from "./firebase";
import { useState, useEffect } from "react";
import s from "./s.jpeg";
import Message from "./components/Message";

function App() {
  const [post, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [o, setO] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [user, setUser] = useState(null);

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    console.log(username);
    setO(false);
    // setUserName("");
    setEmail("");
    setPassword("");
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <form>
            <center>
              <h1>SignUp</h1>
              <Input
                placeholder="username"
                className="Input"
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <br />
              <Input
                placeholder="email"
                className="Input"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <Input
                placeholder="password"
                className="Input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <Button variant="outlined" className="btn4" onClick={signUp}>
                SignUp
              </Button>
            </center>
          </form>
        </Box>
      </Modal>
      <Modal open={o} onClose={() => setO(false)}>
        <Box sx={style}>
          <form>
            <center>
              <h1>Login</h1>
              <Input
                placeholder="username"
                className="Input"
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <br />
              <Input
                placeholder="email"
                className="Input"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <Input
                placeholder="password"
                className="Input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <Button variant="outlined" className="btn4" onClick={signIn}>
                {" "}
                Login
              </Button>
            </center>
          </form>
        </Box>
      </Modal>
      <Header user={user} />
      {user ? (
        <>
          <div className="Front">
            <div className="side_box">
              <Button
                variant="outlined"
                className="btn1"
                onClick={() => auth.signOut()}
              >
                Logout
              </Button>
              <UploadPost username={username} />
              {post.map(({ id, post }) => (
                <Post
                  key={id}
                  username={post.username}
                  caption={post.caption}
                  imgUrl={post.imgurl}
                />
              ))}
            </div>
            {/* <Message curruser={email} /> */}
          </div>
        </>
      ) : (
        <>
          <Button
            variant="outlined"
            className="btn2"
            onClick={() => setOpen(true)}
          >
            SignUp
          </Button>
          <Button
            variant="outlined"
            className="btn3"
            onClick={() => setO(true)}
          >
            Login
          </Button>
          <h1 className="main_h">Connecting Peoples!!!!!!</h1>
          <div className="home">
            <img src={s} alt="omg" className="main" />
          </div>
        </>
      )}
    </>
  );
}

export default App;
