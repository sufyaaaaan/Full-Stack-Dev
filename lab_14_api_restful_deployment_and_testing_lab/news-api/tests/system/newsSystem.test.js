const axios = require('axios');
const http = require('http');
const app = require('../../src/app');

describe('News REST API - End-to-End System Tests', () => {
  let server;
  let port;
  let baseURL;

  beforeAll((done) => {
    // Start listening on a random local socket port
    server = http.createServer(app);
    server.listen(0, () => {
      port = server.address().port;
      baseURL = `http://localhost:${port}`;
      done();
    });
  });

  afterAll((done) => {
    // Shut down server
    server.close(done);
  });

  test('System should resolve end-to-end headline queries for dynamic route (GB)', async () => {
    const response = await axios.get(`${baseURL}/api/news/gb`);

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.country).toBe('GB');
    expect(response.data.articles).toBeDefined();
    expect(Array.isArray(response.data.articles)).toBe(true);
    expect(response.data.articles.length).toBeGreaterThan(0);
    expect(response.data.articles[0]).toHaveProperty('title');
    expect(response.data.articles[0]).toHaveProperty('source');
  });

  test('System should reject dynamic param that does not match size validation (e.g. longer than 2 characters)', async () => {
    try {
      await axios.get(`${baseURL}/api/news/gbr`);
      throw new Error('System allowed 3-letter country code');
    } catch (error) {
      expect(error.response).toBeDefined();
      expect(error.response.status).toBe(400);
      expect(error.response.data.success).toBe(false);
      expect(error.response.data.error).toContain('ISO country code');
    }
  });

  test('System should yield 404 for unsupported route formats', async () => {
    try {
      await axios.get(`${baseURL}/api/news/us/additional/routes`);
      throw new Error('System allowed deeper routes than defined');
    } catch (error) {
      expect(error.response).toBeDefined();
      expect(error.response.status).toBe(404);
      expect(error.response.data.success).toBe(false);
      expect(error.response.data.error).toContain('API Endpoint not found');
    }
  });
});
