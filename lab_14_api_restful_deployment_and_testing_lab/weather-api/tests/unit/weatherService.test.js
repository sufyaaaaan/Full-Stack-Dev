const weatherService = require('../../src/services/weatherService');
const axios = require('axios');

jest.mock('axios');

describe('Weather Service - Unit Tests', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  describe('When API key is NOT configured (Local Mock Database Mode)', () => {
    beforeEach(() => {
      delete process.env.OPENWEATHER_API_KEY;
    });

    test('should fetch weather from local mock DB for valid cities', async () => {
      const result = await weatherService.fetchWeather('London');
      expect(result).toBeDefined();
      expect(result.city).toBe('London');
      expect(result.temperature).toBe(15.4);
      expect(result.condition).toBe('Cloudy');
      expect(result.humidity).toBe(72);
    });

    test('should be case-insensitive when fetching from local mock DB', async () => {
      const result = await weatherService.fetchWeather('  LaHoRe  ');
      expect(result.city).toBe('Lahore');
      expect(result.temperature).toBe(34.0);
    });

    test('should throw a 404 error if city is not in mock DB', async () => {
      try {
        await weatherService.fetchWeather('Berlin');
        fail('Should have thrown an error');
      } catch (error) {
        expect(error.status).toBe(404);
        expect(error.message).toContain('City not found');
      }
    });

    test('should throw an error for empty city string', async () => {
      await expect(weatherService.fetchWeather('')).rejects.toThrow('City name is required');
    });
  });

  describe('When API key IS configured (External API Mode)', () => {
    beforeEach(() => {
      process.env.OPENWEATHER_API_KEY = 'real_api_key_123';
    });

    test('should fetch and format data successfully from external API', async () => {
      const mockResponse = {
        data: {
          name: 'Berlin',
          main: {
            temp: 14.5,
            humidity: 60
          },
          weather: [
            { main: 'Clouds', description: 'scattered clouds' }
          ]
        }
      };

      axios.get.mockResolvedValue(mockResponse);

      const result = await weatherService.fetchWeather('Berlin');

      expect(axios.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: {
            q: 'Berlin',
            appid: 'real_api_key_123',
            units: 'metric'
          }
        })
      );
      expect(result).toEqual({
        city: 'Berlin',
        temperature: 14.5,
        condition: 'Clouds',
        humidity: 60
      });
    });

    test('should handle external API 404 errors', async () => {
      const mockError = {
        response: {
          status: 404,
          data: { message: 'city not found' }
        }
      };

      axios.get.mockRejectedValue(mockError);

      try {
        await weatherService.fetchWeather('InvalidCity');
        fail('Should have failed');
      } catch (error) {
        expect(error.status).toBe(404);
        expect(error.message).toContain("registry");
      }
    });

    test('should handle generic API connection errors', async () => {
      axios.get.mockRejectedValue(new Error('Network Error'));

      try {
        await weatherService.fetchWeather('London');
        fail('Should have failed');
      } catch (error) {
        expect(error.status).toBe(503);
        expect(error.message).toContain('Unable to connect to OpenWeather service');
      }
    });
  });
});
