const newsService = require('../../src/services/newsService');
const axios = require('axios');

jest.mock('axios');

describe('News Service - Unit Tests', () => {
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
      delete process.env.NEWS_API_KEY;
    });

    test('should fetch news headlines from mock database for valid codes', async () => {
      const result = await newsService.fetchHeadlines('us');
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('title');
      expect(result[0]).toHaveProperty('source');
      expect(result[0]).toHaveProperty('url');
      expect(result[0]).toHaveProperty('publishedAt');
    });

    test('should handle inputs with spaces and mixed case correctly', async () => {
      const result = await newsService.fetchHeadlines('  Pk  ');
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    test('should reject codes that are not 2 characters in length', async () => {
      try {
        await newsService.fetchHeadlines('usa');
        fail('Should have thrown validation error');
      } catch (error) {
        expect(error.status).toBe(400);
        expect(error.message).toContain('ISO country code');
      }
    });

    test('should throw error for empty country codes', async () => {
      await expect(newsService.fetchHeadlines('')).rejects.toThrow('Country code is required');
    });
  });

  describe('When API key IS configured (External API Mode)', () => {
    beforeEach(() => {
      process.env.NEWS_API_KEY = 'real_news_key_123';
    });

    test('should fetch, filter, and limit to 10 articles successfully from external API', async () => {
      // 12 articles, including one marked [Removed]
      const mockArticles = Array.from({ length: 12 }, (_, idx) => ({
        title: idx === 3 ? '[Removed]' : `Article Heading ${idx}`,
        source: { name: `Source ${idx}` },
        url: `https://example.com/art-${idx}`,
        publishedAt: `2026-06-02T10:${String(idx).padStart(2, '0')}:00Z`
      }));

      axios.get.mockResolvedValue({
        data: {
          articles: mockArticles
        }
      });

      const result = await newsService.fetchHeadlines('us');

      expect(axios.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: {
            country: 'us',
            apiKey: 'real_news_key_123',
            pageSize: 15
          }
        })
      );

      // Result should exclude [Removed], limiting to a maximum of 10 items
      expect(result.length).toBe(10);
      expect(result[0]).toEqual({
        title: 'Article Heading 0',
        source: 'Source 0',
        url: 'https://example.com/art-0',
        publishedAt: '2026-06-02T10:00:00Z'
      });
      // Verification that '[Removed]' was filtered out
      const containsRemoved = result.some(art => art.title === '[Removed]');
      expect(containsRemoved).toBe(false);
    });

    test('should handle external API error states', async () => {
      axios.get.mockRejectedValue({
        response: {
          status: 401,
          data: { message: 'Your API key is invalid or expired.' }
        }
      });

      try {
        await newsService.fetchHeadlines('us');
        fail('Should have failed');
      } catch (error) {
        expect(error.status).toBe(401);
        expect(error.message).toContain('invalid or expired');
      }
    });

    test('should handle service connection failure gracefully', async () => {
      axios.get.mockRejectedValue(new Error('Connection failure'));

      try {
        await newsService.fetchHeadlines('us');
        fail('Should have failed');
      } catch (error) {
        expect(error.status).toBe(503);
        expect(error.message).toContain('Unable to connect to NewsAPI service');
      }
    });
  });
});
