import React from "react";
import "./EventCard.css";
import dummyPhoto from "./istockphoto-621136226-170667a.jpg";
function EventCard({ event , joinEvent , isJoined, setIsJoined}) {
  // console.log(event);
  const placeholders = {
    nameOfEvent: "Placeholder Title for your Event",
    dateOfEvent: "01 / 02 / 2022",
    age: "18-24 months",
    where: "In a galaxy far far away...",
    description: "A brief description of fun times. Party On!",
  };
  const displayableDate = (date) => {
    const [year, month, day] = date.split("-");
    return [day, month, year].join("-");
  };

  return (
    <div className="EventCard-container">
      <div className="img-button-event-container">
        <img
          src={dummyPhoto}
          alt=""
          style={{ width: "150px", height: "100px", borderRadius: "5px" }}
        />
        <button onClick={()=>{joinEvent(event.id)}}className="event-button">Join Event</button>
        <button className="event-button">Save in Calender</button>
      </div>
      <div className="event-text-container flex-col">
        <h3 className="event-heading">
          {event.nameOfEvent || placeholders.nameOfEvent}
        </h3>
        <h5 className="event-age">{`Ages: ${
          event.age || placeholders.age
        } Months`}</h5>
        <h5 className="event-date">
          {displayableDate(event.dateOfEvent) || placeholders.dateOfEvent}
        </h5>
        <h5 className="event-where">{event.where || placeholders.where}</h5>
        <h4 className="event-description">{event.description}</h4>
      </div>
    </div>
  );
}

export default EventCard;
