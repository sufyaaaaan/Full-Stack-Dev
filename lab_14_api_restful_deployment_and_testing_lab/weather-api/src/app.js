const express = require('express');
const path = require('path');
const weatherController = require('./controllers/weatherController');

const app = express();

// Standard middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from public folder
app.use(express.static(path.join(__dirname, '../public')));

// REST Endpoint
app.get('/api/weather', weatherController.getWeather);

// Root path redirects to index page or serves index explicitly
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Wildcard error handler for unregistered routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'API Endpoint not found'
  });
});

module.exports = app;
