const weatherService = require('../services/weatherService');

/**
 * Controller endpoint to get weather by city
 */
async function getWeather(req, res) {
  const { city } = req.query;

  if (!city || city.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Query parameter "city" is required and cannot be empty'
    });
  }

  try {
    const weatherData = await weatherService.fetchWeather(city);
    return res.status(200).json({
      success: true,
      data: weatherData
    });
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}

module.exports = {
  getWeather
};
