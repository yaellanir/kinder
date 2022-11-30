import React, { useRef, useEffect, useState } from "react";
// import {addDoc, collection} from "@firebase/firestore"
import useFetch from "./hooks/useFetch";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Navbar from "./Components/Navbar";
// import HotAirBaloon from "./Pages/About";
import Register from "./Components/Register";
import LogIn from "./Components/LogIn";
import UpdateProfilePage from "./Components/UpdateProfilePage/UpdateProfilePage";
import Error from "./Pages/Error";
import SwipingFriends from "./Pages/SwipingFriends";
import EventsPage from "./Pages/EventsPage";
import AddEvents from "./Pages/AddEvents";
import "./App.css";

function App() {
  const [loggingIn, setLoggingIn] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [user, setUser] = useState(null);
  const [data, error, loading] = useFetch(
    "https://6374a94848dfab73a4e4fc2d.mockapi.io/kinder"
  );
  // console.log(data);
  const checkLoggedStatus = () => {
    if (user) {
      return true;
    } else {
      setLoggingIn(true);
      return false;
    }
  };

  useEffect(() => {
    //TODO Fetch the user by their ID saved in local storage in order to update the users data
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    const stringifyUser = JSON.stringify(user);
    localStorage.setItem("user", stringifyUser);
  }, [user]);

  return (
    <div className="App">
      <Navbar
        user={user}
        setUser={setUser}
        setLoggingIn={setLoggingIn}
        setRegistering={setRegistering}
      />
      {loggingIn && (
        <LogIn
          error={error}
          user={user}
          users={data}
          setUser={setUser}
          setLoggingIn={setLoggingIn}
          setRegistering={setRegistering}
        />
      )}
      {registering && (
        <Register
          setUser={setUser}
          setLoggingIn={setLoggingIn}
          setRegistering={setRegistering}
        />
      )}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Homepage
              user={user}
              setLoggingIn={setLoggingIn}
              checkLoggedStatus={checkLoggedStatus}
            />
          }
        />
        {/* <Route exact path="/about" element={<About />} /> */}
        <Route
          exact
          path="/swipe"
          element={<SwipingFriends data={data} user={user} setUser={setUser} />}
        />
        <Route
          exact
          path="/events"
          element={<EventsPage user={user} setUser={setUser} />}
        />
        <Route exact path="/add-event" element={<AddEvents user={user} />} />
        <Route
          exact
          path="/profile"
          element={<UpdateProfilePage user={user} setUser={setUser} />}
        />
        {/* <Route exact path="/map" element={<Map />} /> */}
        <Route exact path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
