// src/components/CityAutocomplete.jsx
import React, { useState } from 'react';
import cities from '../data/indian-cities.json'; // Import the city data

const CityAutocomplete = ({ register, setValue, error }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setValue('location', value); // Update react-hook-form value

    if (value.length > 1) {
      const filteredSuggestions = cities
        .filter(city =>
          city.name.toLowerCase().startsWith(value.toLowerCase())
        )
        .slice(0, 5); // Show top 5 matches
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (cityName) => {
    setInputValue(cityName);
    setValue('location', cityName, { shouldValidate: true }); // Set final form value
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <label className="form-label">Location</label>
      <input
        {...register("location", { required: "Location is required" })}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Hide on blur with a small delay
        placeholder="e.g. Bhopal"
        className="form-input mt-2"
        autoComplete="off"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-plum border border-lavender/20 rounded-md mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((city) => (
            <li
              key={city.id}
              className="px-4 py-2 cursor-pointer text-white hover:bg-primary/50"
              onClick={() => handleSuggestionClick(city.name)}
            >
              {city.name}, {city.state}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="form-error">{error.message}</p>}
    </div>
  );
};

export default CityAutocomplete;