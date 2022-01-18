import React, { useState } from "react";
import { firestore } from "../../firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Spinner from "../Common/Spinner";
import ColorPicker from "./ColorPicker";
import FrontPageFooter from "./FrontPageFooter";

export default function FrontPageWelcome({
  user,
  loading,
  setUserNick,
  setUserColor,
  userColor,
}) {
  const [userNickname, setUserNickname] = useState("");

  const handleChange = (e) => {
    setUserNickname(e.target.value);
  };

  const checkNickname = async (nickname, userEmail) => {
    const response = await firestore
      .collection("usersNicknames")
      .doc(nickname)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return true;
        } else {
          if (doc.data().userId === userEmail) {
            return true;
          } else {
            return false;
          }
        }
      });

    return response;
  };

  const saveUserNickname = (userEmail, nickname, color) => {
    firestore
      .collection("users")
      .doc(userEmail)
      .get()
      .then((doc) => {
        firestore
          .collection("users")
          .doc(userEmail)
          .update({ nickname, color });
      });

    firestore
      .collection("usersNicknames")
      .doc(userEmail)
      .get()
      .then((doc) => {
        firestore
          .collection("usersNicknames")
          .doc(nickname)
          .set({ userId: userEmail });
      });
  };

  const handleSubmit = async (nickname) => {
    
    if (!userNickname || userColor.hex === undefined) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: `Debe escribir un nickname y escoger un color favorito`,
        color: '#fff',
        background: '#150714',
      });
      return;
    }

    const isValidNickename = await checkNickname(userNickname, user.email);

    if (isValidNickename) {
      saveUserNickname(user.email, userNickname, userColor);
      setUserNick(userNickname);
    } else {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: `Nickname ${nickname} no esta disponible :(`,
        color: '#fff',
        background: '#150714',
      });
      return;
    }
  };
  
  return (
    <div className="login-container">
      {loading ? (
        <Spinner />
      ) : (
        <div className="login-container-welcome_info">
          <h1 className="login-title">WELCOME</h1>
          <h2 className="login-title login-user-name">{user.displayName}</h2>
          <p className="login-margin">{user.email}</p>
          <input
            className="login-input-name login-margin"
            type="text"
            value={userNickname}
            onChange={handleChange}
            placeholder="Type your username"
          />
          <p className="login-margin">Select your favorite color</p>
          <ColorPicker setUserColor={setUserColor} userColor={userColor} />
          <button
            className="login-btn-continue"
            onClick={()=>handleSubmit(userNickname)}
          >
            CONTINUE
          </button>
          <FrontPageFooter />
        </div>
      )}
    </div>
  );
}
