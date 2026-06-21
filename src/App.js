import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "207e33c1a98dfc8abbfcb8c2f787fa2c";
  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("City not found. Please check the city name.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  return (
    <main className="app">
      <header className="app-header">
        <h1>🌤️ Weather Report</h1>
        <p>Search real-time weather for any city</p>
      </header>

      <section className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input"
            aria-label="City name"
          />
          <button
            onClick={fetchWeather}
            className="search-btn"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </section>

      <section className="result-section">
        {error && (
          <div className="error-box" role="alert">
            ⚠️ {error}
          </div>
        )}
        {loading && (
          <div className="loading-box">
            <div className="spinner"></div>
            <p>Fetching weather...</p>
          </div>
        )}
        {weatherData && !loading && <WeatherCard data={weatherData} />}
      </section>
    </main>
  );
};

export default App;