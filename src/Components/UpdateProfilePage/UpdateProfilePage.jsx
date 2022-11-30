import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserProfileCard from "../UserProfileCard";
import axios from "axios";
import EventCard from "../EventCard/EventCard";
import MatchCard from "../MatchCard";
import "./UpdateProfilePage.css";

function UpdateProfilePage({ user, setUser }) {
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [editting, setEditting] = useState(false);
  const [matches, setMatches] = useState([]);
  const [inputValues, setInputValues] = useState({
    about: "",
    childName: "",
    childAge: "",
    city: "",
    country: "",
    email: "",
    password: "",
    interests: "",
    childGender: "",
  });

  function handleInputs(event) {
    console.log(event.target.value);
    setInputValues((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
    console.log("user updated");
  }

  async function updateUserInfo(eventId) {
    const fieldsToUpdate = {};
    for (const key in inputValues) {
      const value = inputValues[key];
      if (value) {
        fieldsToUpdate[key] = value;
      }
    }
    console.log(fieldsToUpdate);
    const { data: fetchedUser } = await axios.put(
      `https://6374a94848dfab73a4e4fc2d.mockapi.io/kinder/${user.id}`,
      fieldsToUpdate
    );
    console.log(fetchedUser);
    setEditting(false);
    setUser(fetchedUser);
  }

  useEffect(() => {
    if (user) {
      async function displayLikedEvents() {
        const events = await axios.get(
          "https://6374a94848dfab73a4e4fc2d.mockapi.io/events"
        );
        const likedEvents = events.data.filter((event) => {
          // console.log(event.id, user.likedEvents);
          return user.likedEvents.includes(event.id);
        });
        setAttendingEvents(likedEvents);
      }
      const updatedMatches = user.swipedRight.filter((userILiked) =>
        user.swipedOnMe.includes(userILiked)
      );
      console.log({ updatedMatches });
      setMatches(updatedMatches);
      displayLikedEvents();
    }
    console.log(user);
  }, [user]);

  return (
    <div className="flex-col">
      <div className="profile-container">
        <Link to="/">
          <h4 className="backToHome">Back To Homepage</h4>
        </Link>
        {user && (
          <div className="profile-update-card-wrapper">
            <div className="profile-update-card flex-col">
              <div className="update-header">
                <h3>Update My Profile:</h3>
                {editting ? (
                  <button onClick={updateUserInfo}>CONFIRM</button>
                ) : (
                  <button onClick={() => setEditting(true)}>EDIT</button>
                )}
              </div>
              {editting ? (
                <>
                  <label>Profile Pic:</label>
                  <input className="file" type="file" />

                  <label>Name: </label>
                  <input
                    type="text"
                    name="parentName"
                    defaultValue={`${user.parentName}`}
                    onChange={handleInputs}
                  />

                  <label>Name Of Child: </label>
                  <input
                    type="text"
                    name="childName"
                    defaultValue={`${user.childName}`}
                    onChange={handleInputs}
                  />

                  <label>City: </label>
                  <input
                    type="text"
                    name="city"
                    defaultValue={`${user.city}`}
                    onChange={handleInputs}
                  />

                  <label>Country: </label>
                  <input
                    type="text"
                    name="country"
                    defaultValue={`${user.country}`}
                    onChange={handleInputs}
                  />

                  <label>Interests: </label>
                  <input
                    type="text"
                    name="interests"
                    defaultValue={`${user.interests}`}
                    onChange={handleInputs}
                  />

                  <label>About: </label>
                  <input
                    type="text"
                    name="about"
                    defaultValue={`${user.about}`}
                    onChange={handleInputs}
                  />

                  <label>Email: </label>
                  <input
                    type="text"
                    name="email"
                    defaultValue={`${user.email}`}
                    onChange={handleInputs}
                  />

                  <label>Password: </label>
                  <input
                    type="text"
                    name="password"
                    defaultValue={`${user.password}`}
                    onChange={handleInputs}
                  />

                  <label>Gender: </label>
                  <input
                    type="text"
                    name="childGender"
                    defaultValue={`${user.childGender}`}
                    onChange={handleInputs}
                  />

                  <label>Age of Child: </label>
                  <input
                    type="text"
                    name="childAge"
                    defaultValue={`${user.childAge}`}
                    onChange={handleInputs}
                  />
                </>
              ) : (
                <UserProfileCard className="profile-update-card" user={user} />
              )}
            </div>
            <div className="user-events-container">
              <div className="update-events-header">
                <h3>Events I'm Attending:</h3>
              </div>
              {attendingEvents.map((event, index) => (
                <EventCard
                  className="update-event"
                  key={`event${index}`}
                  event={event}
                />
              ))}
            </div>
            <div className="user-events-container">
              <div className="update-events-header">
                <h3>Matches:</h3>
              </div>
              {matches?.map((userId, i) => (
                <MatchCard
                  className="update-event"
                  key={`match${i}`}
                  userId={userId}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateProfilePage;
