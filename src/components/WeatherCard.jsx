import React from "react";

const WeatherCard = ({ data }) => {
  const { name, sys, main, weather, wind } = data;

  return (
    <div className="weather-card">
      <div className="location">
        <h2>{name}, {sys.country}</h2>
        <p className="date">{new Date().toDateString()}</p>
      </div>

      <div className="weather-main">
        <img
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt={weather[0].description}
        />
        <h1 className="temp">{Math.round(main.temp)}°C</h1>
        <p className="description">{weather[0].description}</p>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="label">Feels Like</span>
          <span className="value">{Math.round(main.feels_like)}°C</span>
        </div>
        <div className="detail-item">
          <span className="label">Humidity</span>
          <span className="value">{main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="label">Min Temp</span>
          <span className="value">{Math.round(main.temp_min)}°C</span>
        </div>
        <div className="detail-item">
          <span className="label">Max Temp</span>
          <span className="value">{Math.round(main.temp_max)}°C</span>
        </div>
        <div className="detail-item">
          <span className="label">Wind Speed</span>
          <span className="value">{wind.speed} m/s</span>
        </div>
        <div className="detail-item">
          <span className="label">Pressure</span>
          <span className="value">{main.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;