import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EventCard from "../Components/EventCard/EventCard";
import { useNavigate } from "react-router-dom";
// import Calendar from 'react-input-calendar'
import "./AddEvents.css";

function Search({ user }) {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [where, setWhere] = useState("");
  const [when, setWhen] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState(false);
  const [imgFile, setImgFile] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  function addEventTitle(event) {
    const inputEventName = event.target.value;
    console.log(inputEventName);
    setEventName(inputEventName);
  }
  function addWhere(event) {
    const inputWhere = event.target.value;
    console.log(inputWhere);
    setWhere(inputWhere);
  }
  function addWhen(event) {
    const inputWhen = event.target.value;
    console.log(inputWhen);
    setWhen(inputWhen);
  }
  function addAge(event) {
    const inputAge = event.target.value;
    console.log(inputAge);
    setAge(inputAge);
  }
  function addDescription(event) {
    const inputDescription = event.target.value;
    console.log(inputDescription);
    setDescription(inputDescription);
  }

  function handlePic(event) {
    console.log(event.target.files[0]);
    setImgFile(event.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formSubmitted = await axios.post(
      "https://6374a94848dfab73a4e4fc2d.mockapi.io/events",
      {
        nameOfEvent: eventName,
        dateOfEvent: when,
        age: age,
        where: where,
        image: imgFile,
        description: description,
        createdBy: user.id,
      }
    );
    console.log(formSubmitted);
    setFormSubmitted(true);
    setTimeout(() => {
      navigate("/Events");
    }, 1500);
  }

  const ageOptions = [
    { value: "", text: "Age?" },
    { value: "3-6", text: "3-6 Months" },
    { value: "6-9", text: "6-9 Months" },
    { value: "9-12", text: "9-12 Months" },
    { value: "12-18", text: "1 - 1.5 Years" },
    { value: "18-24", text: "1.5 - 2 Years" },
    { value: "24-36", text: "2 - 3 Years" },
    { value: "36-42", text: "3 - 4 Years" },
    { value: "42-54", text: "4 - 5 Years" },
  ];

  // todo: redirect
  // todo: add location ?! somehow auto complete or map
  return (
    <div className="section">
      {formSubmitted && (
        <div className="overlay">
          <div className="popup">
            <h3>Redirecting To Event Page...</h3>
          </div>
        </div>
      )}
        <Link to="/">
          <h4 className="back">Back To Homepage</h4>
        </Link>
      <div className="add-event-wrap">
        <form onSubmit={(e) => e.preventDefault()} className="form-addEvent">
          <div className="form-container">
            <div>
            <div className="input-form">
              <label>What is the event title?</label>
              <input
                className="input"
                type="text"
                onChange={addEventTitle}
                placeholder="Title?"
              />
            </div>

            <div className="input-form">
              <label>Where is your play-date?</label>
              <input
                className="input"
                type="text"
                onChange={addWhere}
                placeholder="Where?"
              />
            </div>
            <div className="input-form">
              <label>When does it take place?</label>
              <input
                className="input"
                type="date"
                onChange={addWhen}
                placeholder="When?"
              />
            </div>
            <div className="input-form">
              <label>Ages?</label>
              <select className="input" onChange={addAge} name="age" id="when">
                {ageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
            </div>

            <div className="second-part">
              <div className="input-form">
                <label>Tell us about the event</label>
                <textarea className="text" onChange={addDescription} />
              </div>
              <div className="submit-flex">
              <button onClick={handleSubmit} className="btn">
                Submit
              </button>
            </div>
            </div>

          </div>
          {/* <div className="flex"> */}
          {/* <input type="file" onChange={handlePic} /> */}
          {/* <button className="btn-upload">Upload Image</button> */}
          {/* </div> */}
        </form>

        <div className="event-pre-approval">
          <h3>Post Preview:</h3>
          <EventCard
            event={{
              nameOfEvent: eventName,
              dateOfEvent: when,
              age: age,
              where: where,
              image: imgFile,
              description: description,
            }}
          />
          <div className="flex btn-container"></div>
        </div>
      </div>
    </div>
  );
}
// todo : redirect

export default Search;
