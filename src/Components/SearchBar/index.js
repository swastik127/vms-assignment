import {
  faSearch,
  faCalendarDays,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./styles.css";
import { format, addYears } from "date-fns";
import data from "../../data.json";
import SearchPlace from "../SearchPlace";

function SearchBar() {
  const [place, setPlace] = useState("");
  const [label, setlabel] = useState([]);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 2,
    children: 0,
    room: 1,
  });

  const resetFlag =
    options.adult === 2 && options.room === 1 && options.children === 0;

  const handleReset = () => {
    setOptions({ adult: 2, children: 0, room: 1 });
  };

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  useEffect(() => {
    const tempData = data.places?.map((item) => ({
      label: item.name,
      value: item.name,
    }));
    setlabel(tempData);
  }, []);

  const handleSearch = () => {
    console.log({
      place,
      startDate: format(date[0].startDate, "MM/dd/yyyy"),
      endDate: format(date[0].endDate, "MM/dd/yyyy"),
      ...options,
    });
  };

  return (
    <div className="headerSearch">
      <div className="headerSearchItem">
        <FontAwesomeIcon icon={faSearch} className="headerIcon" />
        <div>
          <div className="upperHeader">Landmark</div>
          <SearchPlace options={label} place={place} setPlace={setPlace} />
        </div>
      </div>
      <div className="headerSearchItem">
        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
        <div>
          <div className="upperHeader">
            Check-in &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            Check-out
          </div>
          <span
            onClick={() => setOpenDate(!openDate)}
            className="headerSearchText"
          >
            {format(date[0].startDate, "MM/dd/yyyy")} &nbsp; &nbsp; &nbsp;
            {format(date[0].endDate, "MM/dd/yyyy")}
          </span>
        </div>
        {openDate && (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            className="date"
            minDate={new Date()}
            maxDate={addYears(new Date(), 1)}
          />
        )}
      </div>
      <div className="headerSearchItem">
        <FontAwesomeIcon icon={faBed} className="headerIcon" />
        <div>
          <div className="upperHeader">Guests and Rooms</div>
          <span
            onClick={() => setOpenOptions(!openOptions)}
            className="headerSearchText"
          >
            {`${options.adult + options.children} Guests, ${options.room} room`}
          </span>
        </div>
        {openOptions && (
          <div className="options">
            <div className="optionItem">
              <span className="optionText">Adults</span>
              <div className="optionCounter">
                <button
                  disabled={options.adult <= 1}
                  className="optionCounterButton"
                  onClick={() => handleOption("adult", "d")}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.adult}</span>
                <button
                  disabled={options.room * 2 <= options.adult}
                  className="optionCounterButton"
                  onClick={() => handleOption("adult", "i")}
                >
                  +
                </button>
              </div>
            </div>
            <div className="optionItem">
              <span className="optionText">Children</span>
              <div className="optionCounter">
                <button
                  disabled={options.children <= 0}
                  className="optionCounterButton"
                  onClick={() => handleOption("children", "d")}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.children}</span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption("children", "i")}
                >
                  +
                </button>
              </div>
            </div>
            <div className="optionItem">
              <span className="optionText">Room</span>
              <div className="optionCounter">
                <button
                  disabled={options.room <= 1}
                  className="optionCounterButton"
                  onClick={() => handleOption("room", "d")}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.room}</span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption("room", "i")}
                >
                  +
                </button>
              </div>
            </div>
            <div className="separator" />
            <div className="optionItem">
              <div>
                <span className="optionText">Pet-Friendly</span>
                <div className="subOptionText">
                  Only show stays that allow pets
                </div>
              </div>
              <input type="checkbox" />
            </div>
            <div className="buttonContainer">
              <button
                className="headerBtn"
                disabled={resetFlag}
                style={resetFlag ? { background: "grey" } : null}
                onClick={handleReset}
              >
                Reset
              </button>
              <button className="headerBtn">Apply</button>
            </div>
          </div>
        )}
      </div>
      <div className="headerSearchItem">
        <button className="headerBtn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
