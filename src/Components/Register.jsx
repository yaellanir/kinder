import "./Register.css";
import React, { useState } from "react";
import "./LogIn.css";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { Link } from "react-router-dom";
// import {addDoc, collection} from "@firebase/firestore"

function Register({ setUser, setLoggingIn, setRegistering }) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputChildName, setChildInputName] = useState("");
  const [userRegistered, setUserRegistered] = useState(false);
  // const [data, error, loading] = useFetch(
  //   "https://6374a94848dfab73a4e4fc2d.mockapi.io/kinder"
  // );
  // console.log(data);

  function addName(event) {
    const inputValueName = event.target.value;
    console.log(inputValueName);
    setInputName(inputValueName);
  }
  function addChildName(event) {
    const inputValueChildName = event.target.value;
    console.log(inputValueChildName);
    setChildInputName(inputValueChildName);
  }
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

  async function addUser() {
    console.log("user added");
    const userAdded = await axios.post(
      "https://6374a94848dfab73a4e4fc2d.mockapi.io/kinder",
      { parentName:inputName, childName:inputChildName, email: inputEmail, password: inputPassword }
    );
    console.log(userAdded);
    if (userAdded.data) {
      localStorage.setItem("user", JSON.stringify(userAdded.data))
      setUser(userAdded.data)
    }
    setUserRegistered(true);
    

    setTimeout(() => {
      console.log('message displayed');
      setRegistering(false);
    }, 3500);
  }

  function exitPopUp() {
    setRegistering(false);
  }

  return (
    <div className="popup-wrapper overlay">
      <div className="login popup">
        <button className="exit-button" onClick={exitPopUp}>
          X
        </button>
        {userRegistered ? (
          <div className="message">{`Welcome ${inputName}! Thank You for registering`}</div>
        ) : (
          <>
            <div className="flex-col flex-center popup-header">
              <h2>Register</h2>
              <div className="flex not-member">
                <h5>Already a member ? </h5>
                <div
                  onClick={() => {
                    setRegistering(false);
                    setLoggingIn(true);
                  }}
                >
                  Sign In
                </div>
              </div>
            </div>
            <div className="input-Container">
              <label>Name</label>
              <input onChange={addName} type="text" />
            </div>
            <div className="input-Container">
              <label>Child's Name</label>
              <input onChange={addChildName} type="text" />
            </div>
            <div className="input-Container">
              <label>Email</label>
              <input onChange={addEmail} type="text" />
            </div>
            <div className="input-Container">
              <label>Password</label>
              <input onChange={addPassword} type="text" />
            </div>
            <button onClick={addUser} className="btn">
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Register;
