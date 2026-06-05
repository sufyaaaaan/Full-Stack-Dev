const axios = require('axios');
const http = require('http');
const app = require('../../src/app');

describe('Weather REST API - End-to-End System Tests', () => {
  let server;
  let port;
  let baseURL;

  beforeAll((done) => {
    // Stand up the full HTTP server on a random open port
    server = http.createServer(app);
    server.listen(0, () => {
      port = server.address().port;
      baseURL = `http://localhost:${port}`;
      done();
    });
  });

  afterAll((done) => {
    // Tear down the HTTP server after assertions
    server.close(done);
  });

  test('System should resolve end-to-end request for a known city (Tokyo)', async () => {
    const response = await axios.get(`${baseURL}/api/weather`, {
      params: { city: 'Tokyo' }
    });

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.data).toBeDefined();
    expect(response.data.data.city).toBe('Tokyo');
    expect(response.data.data.temperature).toBe(16.5);
    expect(response.data.data.condition).toBe('Rainy');
    expect(response.data.data.humidity).toBe(85);
  });

  test('System should handle end-to-end validation failure for invalid input parameters', async () => {
    try {
      await axios.get(`${baseURL}/api/weather`, {
        params: { city: '' }
      });
      throw new Error('System allowed an empty city parameter');
    } catch (error) {
      expect(error.response).toBeDefined();
      expect(error.response.status).toBe(400);
      expect(error.response.data.success).toBe(false);
      expect(error.response.data.error).toContain('required');
    }
  });

  test('System should handle end-to-end API failure mapping for missing entries', async () => {
    try {
      await axios.get(`${baseURL}/api/weather`, {
        params: { city: 'Gotham' }
      });
      throw new Error('System allowed weather fetching for Gotham');
    } catch (error) {
      expect(error.response).toBeDefined();
      expect(error.response.status).toBe(404);
      expect(error.response.data.success).toBe(false);
      expect(error.response.data.error).toContain('City not found');
    }
  });
});
