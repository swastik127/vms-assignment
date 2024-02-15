import React, { useState } from "react";
import "./styles.css";

const SearchPlace = ({ options, place, setPlace }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleButtonClick = (value) => {
    setPlace(value);
    setSearchTerm("");
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Where to?"
        className="headerSearchInput"
        value={searchTerm || place}
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <div className="list" value={selectedOption} onChange={handleChange}>
          {filteredOptions.map((option) => (
            <button
              key={option.value}
              value={option.value}
              onClick={() => handleButtonClick(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPlace;
