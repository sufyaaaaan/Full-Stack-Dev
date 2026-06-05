const request = require('supertest');
const app = require('../../src/app');

describe('Weather API - Integration Tests', () => {
  describe('GET /api/weather', () => {
    test('should return 200 OK and weather data for a valid city', async () => {
      const response = await request(app)
        .get('/api/weather')
        .query({ city: 'London' });

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toEqual({
        success: true,
        data: {
          city: 'London',
          temperature: 15.4,
          condition: 'Cloudy',
          humidity: 72
        }
      });
    });

    test('should return 400 Bad Request if city query param is missing', async () => {
      const response = await request(app)
        .get('/api/weather');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        success: false,
        error: 'Query parameter "city" is required and cannot be empty'
      });
    });

    test('should return 400 Bad Request if city query is empty spaces', async () => {
      const response = await request(app)
        .get('/api/weather')
        .query({ city: '   ' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('cannot be empty');
    });

    test('should return 404 Not Found for non-existing city in database', async () => {
      const response = await request(app)
        .get('/api/weather')
        .query({ city: 'Atlantis' });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('City not found');
    });
  });

  describe('Static Site Serving & Fallback Router', () => {
    test('should serve index.html on root path GET /', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('text/html');
    });

    test('should return 404 for unhandled API routes', async () => {
      const response = await request(app).get('/api/does-not-exist');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        success: false,
        error: 'API Endpoint not found'
      });
    });
  });
});
