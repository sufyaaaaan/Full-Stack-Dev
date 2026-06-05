const newsService = require('../services/newsService');

/**
 * Controller endpoint to get top headlines by country code
 */
async function getHeadlines(req, res) {
  const { countryCode } = req.params;

  if (!countryCode || countryCode.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Country code parameter is required'
    });
  }

  try {
    const articles = await newsService.fetchHeadlines(countryCode);
    
    // Ensure response count is validated and structured correctly
    return res.status(200).json({
      success: true,
      country: countryCode.trim().toUpperCase(),
      count: articles.length,
      articles: articles
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
  getHeadlines
};
