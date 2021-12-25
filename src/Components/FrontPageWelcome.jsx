import React, { useState } from "react";
import ColorPicker from "./ColorPicker";
import FrontPageFooter from "./FrontPageFooter";

export default function FrontPageWelcome({user, setUserName, setColor}) {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = () => {
        setUserName(inputValue);
    }
  return (
    <div className="login-container">
      <div className="login-container_info">
        <h1 className="login-title">WELCOME</h1>
        <h2 className="login-subtitle">{user.displayName}</h2>
        <input type="text" value={inputValue} onChange={handleChange} placeholder="Type your username"/>
        <p>Select your favorite color</p>
        <ColorPicker setColor={setColor}/>
        <button onClick={handleSubmit} >CONTINUE</button>
        <FrontPageFooter />
      </div>
    </div>
  );
}
