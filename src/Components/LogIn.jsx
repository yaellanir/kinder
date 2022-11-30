import React, { useState } from "react";
import "./LogIn.css";

// import {firebase} from "../firebase"
// import {addDoc, collection} from "@firebase/firestore"

function LogIn({ error, user, setUser, users, setLoggingIn, setRegistering }) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [displayMsg, setDisplayMsg] = useState(false);
  const [wrongDataEntered, setWrongDataEntered] = useState(false);

  function addEmail(event) {
    const inputValueEmail = event.target.value;
    console.log(inputValueEmail);
    setInputEmail(inputValueEmail);
  }
  function addPassword(event) {
    const inputValuePassword = event.target.value;
    console.log(inputValuePassword);
    setInputPassword(inputValuePassword);
  }

  async function logUser() {
    console.log("logging in");
    const searchedUser = users.find(
      (user) => user.email === inputEmail && user.password === inputPassword
    );
    console.log(searchedUser);
    if (searchedUser) {
      setUser(searchedUser);
      localStorage.setItem("user", JSON.stringify(searchedUser));
      setDisplayMsg(true);
    } else {
      setWrongDataEntered(true);
    }

    setTimeout(() => {
      console.log("message displayed");
      setLoggingIn(false);
    }, 2000);
  }

  function exitPopUp() {
    setLoggingIn(false);
  }

  return (
    <div className="popup-wrapper overlay">
      <div className="login popup">
        <button onClick={exitPopUp} className="exit-button">
          X
        </button>

        {displayMsg ? (
          <div className="message">{`Welcome Back ${user.parentName}`}! </div>
        ) : (
          <>
            <div className="flex-col flex-center popup-header">
              <h2>Log In</h2>
              <div className="flex not-member">
                <h5>Not a member yet ? </h5>
                <div
                  onClick={() => {
                    setRegistering(true);
                    setLoggingIn(false);
                  }}
                >
                  Register
                </div>
              </div>
            </div>
            <div className="input-Container">
              <label>Email</label>
              <input onChange={addEmail} type="text" />
            </div>
            <div className="input-Container">
              <label>Password</label>
              <input onChange={addPassword} type="text" />
            </div>
            <div className="checkbox-Container">
              <input type="checkbox" />
              <label>Keep me signed in</label>
            </div>
            <button onClick={logUser} className="btn">
              Log In
            </button>
            {wrongDataEntered && "User not found - try again!"}
          </>
        )}
      </div>
    </div>
  );
}

export default LogIn;
