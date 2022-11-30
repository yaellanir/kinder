import "./SearchBar.css";
import React, { useState } from "react";

function Searchbar({
  onSubmit,
  age,
  setAge,
  when,
  setWhen,
  location,
  setLocation,
}) {

  const [submit, setSubmit] = useState(false);


  const timeOptions = [
    { value: "", text: "When?" },
    { value: "today", text: "Today" },

    { value: "week", text: "This Week" },
    { value: "weekend", text: "This Weekend" },
    { value: "month", text: "This Month" },
  ];
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

  function handleAgeInput(event) {
    const inputAge = event.target.value;
    setAge(inputAge);
  }
  function handleLocationInput(event) {
    const inputLocation = event.target.value;
    setLocation(inputLocation);
  }

  function handleWhenInput(event) {
    const inputWhen = event.target.value;
    setWhen(inputWhen);
 
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmit(true);
    onSubmit({
      age,
      location,
      when,
    });
    console.log("form submitted");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="SearchBar-container flex-center flex">
        <div className="flex-col flex-center">
          <label>Ages?</label>
          <select value={age} onChange={handleAgeInput} name="age" id="when">
            {ageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-col flex-center">
          <label>Where?</label>
          <input
            onChange={handleLocationInput}
            type="text"
            className="where?"
            placeholder="Where? "
          />
        </div>
        <div className="flex-col flex-center">
          <label>When?</label>
          <select value={when} onChange={handleWhenInput} name="when" id="when">
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
}

export default Searchbar;
