import { COUNTRIES_API } from "../Constants";
import React, { useEffect, useState } from "react";

const Countries = ({ onSelectCountry }) => {
  const [countryNames, setCountryNames] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Asia/Kolkata");

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    try {
      const response = await fetch(COUNTRIES_API);
      const data = await response.json();
      setCountryNames(data);
    } catch (error) {
      console.error("Error fetching country names:", error);
    }
  }

  const handleCountryChange = (event) => {
    const selected = event.target.value;
    setSelectedCountry(selected);
    onSelectCountry(selected);
  };

  return (
    <div>
      <select
        id="countrySelect"
        value={selectedCountry}
        onChange={handleCountryChange}
        className="border border-black p-2.5 m-1 w-4/5"
      >
        <option>{selectedCountry}</option>
        {countryNames.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Countries;
