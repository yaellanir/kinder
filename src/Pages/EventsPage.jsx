import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import Searchbar from "../Components/Search-Bar/SearchBar";
import EventCard from "../Components/EventCard/EventCard";
import axios from "axios";
import { isDateInRange, isEventExpired } from "../utils";

import "./EventsPage.css";

function EventsPage({ user, setUser }) {
  const [age, setAge] = useState("");
  const [location, setLocation] = useState(null);
  const [when, setWhen] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(null);
  const [unexpiredEvents, setUnexpiredEvents] = useState(null);
  const [isJoined, setIsJoined] = useState(false);

  const [data] = useFetch("https://6374a94848dfab73a4e4fc2d.mockapi.io/events");

  async function joinEvent(eventId) {
    const updatedUser = {
      ...user,
      likedEvents: [...user.likedEvents, eventId],
    };
    const result = await axios.put(
      `https://6374a94848dfab73a4e4fc2d.mockapi.io/kinder/${user.id}`,
      updatedUser
    );
    console.log(result.data);
    setUser(result.data);
    setIsJoined(true);
  }

  useEffect(() => {
    const nonExpiredEvents = data?.filter((event) =>
      isEventExpired(event.dateOfEvent)
    );
    setUnexpiredEvents(nonExpiredEvents);
    setFilteredEvents(nonExpiredEvents);
  }, [data]);

  useEffect(() => {
    function filterSearchedInputs() {
      if (filteredEvents) {
        const updatedFilteredData = unexpiredEvents.filter((item) => {
          return (
            item.age.includes(age || "") &&
            item.where.includes(location || "") &&
            isDateInRange(when || "", item.dateOfEvent)
          );
        });
        setFilteredEvents(updatedFilteredData);
      }
    }
    filterSearchedInputs();
    //eslint-disable-next-line

  }, [age, location, when]);

  return (
    <div className="events-container">
      <Link to="/">
        <h4>Back To Homepage</h4>
      </Link>
      <Searchbar
        age={age}
        setAge={setAge}
        when={when}
        setWhen={setWhen}
        location={location}
        setLocation={setLocation}
      />
      {filteredEvents && (
        <div className="card-map-container flex">
          {filteredEvents?.map((event, i) => {
            return (
              <EventCard
                key={i}
                isJoined={isJoined}
                setIsJoined={setIsJoined}
                joinEvent={joinEvent}
                event={event}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default EventsPage;
