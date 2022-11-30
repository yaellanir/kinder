import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateUser } from "../Api/api";
import UserProfileCard from "../Components/UserProfileCard";
import "./SwipingFriends.css";

function SwipingFriends({ data, user, setUser }) {
  const [index, setIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  if (!localStorage.getItem("user")) {
    navigate("/");
  }
  useEffect(() => {
    if (user) {
      const filteredData = data?.filter((otherUser) => {
        if (
          user.swipedLeft.includes(otherUser.id) ||
          user.id === otherUser.id
        ) {
          return false;
        }
        return true;
      });
      console.log(filteredData);
      setUsers(filteredData);
    }
  }, [user, data]);

  async function swipeRight() {
    const currentViewedUser = users[index];
    //Add users id to the user we swiped on
    const updatedCurrentViewedUser = {
      ...currentViewedUser,
      swipedOnMe: [...currentViewedUser.swipedOnMe, user.id],
    };
    const updatedUser = {
      ...user,
      swipedRight: [...user.swipedRight, currentViewedUser.id],
    };
    console.log({ updatedUser, updatedCurrentViewedUser });
    setUser(updatedUser);

    //Update both users in mock api
    updateUser(updatedUser);
    updateUser(updatedCurrentViewedUser);
    if (users.length - 1 === index) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  }

  function swipeLeft() {
    const currentViewedUser = users[index];
    //Add users id to the user we swiped on

    const updatedUser = {
      ...user,
      swipedLeft: [...user.swipedLeft, currentViewedUser.id],
    };
    console.log({ updatedUser });
    setUser(updatedUser);

    //Update user in mock api
    updateUser(updatedUser);
    setIndex((prev) => prev + 1);
  }

  return (
    <div className="swiping-container">
      <Link to="/">
        <div className="back">Back To Homepage</div>
      </Link>
      {users?.length > 0 && index < users.length && (
        <div className="card-container">
          <div className="card">
            <UserProfileCard user={users[index]} />
          </div>
            <div className="swipe-btn-container">
              <button onClick={swipeLeft} className="btn btn-swipe-left">
                Another Time
              </button>
              <button onClick={swipeRight} className="btn btn-swipe-right">
                Let's Play!
              </button>
            </div>
        </div>
      )}
    </div>
  );
}

export default SwipingFriends;
