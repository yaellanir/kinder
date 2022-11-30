import React from "react";
import "./UserProfileCard.css";

function UserProfileCard({ data, user }) {
  return (
    // <div className="card-container flex">
    // <div className="card">
    <>
      <div
        className="swipe-image"
        style={{ background: `url(${user.avatar}) no-repeat center` }}
      ></div>
      <h4>{`HI! I'm ${user.parentName} , Parent of the wonderful:`}</h4>
      <div>
        <br />
        <div className="name-age">
          <h2>{user.childName}</h2>
          <h3>{`${user.childAge} years old`}</h3>
        </div>
        <h4>{`${user.city},${user.country}`}</h4>
        <br />
        <h5>{`interests: ${user.interests}`}</h5>
        <br />
        <p>{`about me:${user.about}`}</p>
      </div>
    </>
    // </div>
    // </div>
  );
}

export default UserProfileCard;
