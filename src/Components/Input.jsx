import React from "react";

const Input = ({ type, onChange, value }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  return <input type={type} onChange={handleChange} value={value} />;
};

export default Input;
