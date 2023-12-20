import { useEffect, useState } from "react";
import { COUNTRIES_API } from "../Constants";

const CountryTime = ({ selectedCountry }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    getCountryTime();
  }, [selectedCountry]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setCurrentTime((previousTime) => previousTime + 1000);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, selectedCountry]);

  async function getCountryTime() {
    try {
      const response = await fetch(`${COUNTRIES_API}/${selectedCountry}`);
      const countryData = await response.json();
      const offset = new Date().getTimezoneOffset();
      const utcOffset = parseInt(countryData.raw_offset);
      const actualTime =
        (countryData.unixtime + offset * 60 + utcOffset) * 1000;
      setCurrentTime(actualTime);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  const toggleClock = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  return (
    <div className="flex">
      <p className="bg-black text-white rounded-lg p-2.5 m-1">
        {new Date(currentTime).toLocaleTimeString()}
      </p>
      <button
        onClick={() => toggleClock()}
        className="bg-green-400 rounded-lg text-white p-2.5 m-1"
      >
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default CountryTime;
