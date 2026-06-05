const axios = require('axios');
require('dotenv').config();

const OPENWEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Mock weather database for fallback and local testing
const MOCK_WEATHER_DB = {
  'london': { city: 'London', temperature: 15.4, condition: 'Cloudy', humidity: 72 },
  'paris': { city: 'Paris', temperature: 18.2, condition: 'Sunny', humidity: 55 },
  'new york': { city: 'New York', temperature: 22.1, condition: 'Sunny', humidity: 48 },
  'tokyo': { city: 'Tokyo', temperature: 16.5, condition: 'Rainy', humidity: 85 },
  'lahore': { city: 'Lahore', temperature: 34.0, condition: 'Sunny', humidity: 30 },
  'sydney': { city: 'Sydney', temperature: 19.8, condition: 'Partly Cloudy', humidity: 62 }
};


/**
 * Fetch weather data for a given city
 * @param {string} city 
 * @returns {Promise<object>} Cleaned weather data
 */
async function fetchWeather(city) {
  if (!city) {
    throw new Error('City name is required');
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  const normalizedCity = city.trim().toLowerCase();

  // If no API key is provided, or if the user is fetching mock data, use fallback database
  if (!apiKey || apiKey === 'PLACEHOLDER' || apiKey === 'mock_key') {
    if (MOCK_WEATHER_DB[normalizedCity]) {
      return MOCK_WEATHER_DB[normalizedCity];
    } else {
      const err = new Error('City not found');
      err.status = 404;
      throw err;
    }
  }

  try {
    const response = await axios.get(OPENWEATHER_API_URL, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric'
      }
    });

    const data = response.data;
    return {
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather[0] ? data.weather[0].main : 'Unknown',
      humidity: data.main.humidity
    };
  } catch (error) {
    const err = new Error();
    if (error.response) {
      if (error.response.status === 404) {
        err.message = `City '${city}' not found in OpenWeather registry`;
        err.status = 404;
      } else {
        err.message = error.response.data.message || 'External weather service error';
        err.status = error.response.status;
      }
    } else {
      err.message = 'Unable to connect to OpenWeather service';
      err.status = 503;
    }
    throw err;
  }
}

module.exports = {
  fetchWeather,
  MOCK_WEATHER_DB
};
