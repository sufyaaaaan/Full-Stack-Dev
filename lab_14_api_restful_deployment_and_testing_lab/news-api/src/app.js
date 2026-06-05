const express = require('express');
const path = require('path');
const newsController = require('./controllers/newsController');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets
app.use(express.static(path.join(__dirname, '../public')));

// Dynamic route parameter REST Endpoint
app.get('/api/news/:countryCode', newsController.getHeadlines);

// Root path redirection
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Wildcard router
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'API Endpoint not found'
  });
});

module.exports = app;
