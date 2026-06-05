const request = require('supertest');
const app = require('../../src/app');

describe('News API - Integration Tests', () => {
  describe('GET /api/news/:countryCode', () => {
    test('should return 200 OK and articles array for valid country code', async () => {
      const response = await request(app).get('/api/news/us');

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body.success).toBe(true);
      expect(response.body.country).toBe('US');
      expect(response.body.count).toBeDefined();
      expect(Array.isArray(response.body.articles)).toBe(true);
      expect(response.body.articles.length).toBeGreaterThan(0);
    });

    test('should return 400 Bad Request for dynamic param with invalid country code size', async () => {
      const response = await request(app).get('/api/news/usa');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('ISO country code');
    });

    test('should return 400 Bad Request for country code shorter than 2 characters', async () => {
      const response = await request(app).get('/api/news/a');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('Static Site Serving & Router Fallback', () => {
    test('should serve index.html on root endpoint GET /', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('text/html');
    });

    test('should return 404 for undefined routes', async () => {
      const response = await request(app).get('/api/news-headlines/search');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        success: false,
        error: 'API Endpoint not found'
      });
    });
  });
});
