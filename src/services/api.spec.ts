import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiConfig, buildUrl, apiRequest } from './api';

// Mock fetch
global.fetch = vi.fn();

describe('API Configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('apiConfig', () => {
    it('should have correct configuration', () => {
      expect(apiConfig.baseURL).toBe('https://api.themoviedb.org/3');
      expect(apiConfig.imageBaseURL).toBe('https://image.tmdb.org/t/p/w500');
      expect(apiConfig.headers).toHaveProperty('Authorization');
      expect(apiConfig.headers.Authorization).toMatch(/^Bearer /);
      expect(apiConfig.headers['Content-Type']).toBe('application/json');
    });
  });

  describe('buildUrl', () => {
    it('should build URL without parameters', () => {
      const url = buildUrl('/discover/movie');
      expect(url).toBe('https://api.themoviedb.org/3/discover/movie');
    });

    it('should build URL with parameters', () => {
      const url = buildUrl('/discover/movie', { page: 1, language: 'en-US' });
      expect(url).toContain('page=1');
      expect(url).toContain('language=en-US');
    });
  });

  describe('apiRequest', () => {
    it('should make successful API request', async () => {
      const mockData = { results: [], page: 1 };
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const result = await apiRequest('/discover/movie');

      expect(fetch).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/discover/movie',
        {
          method: 'GET',
          headers: apiConfig.headers,
        }
      );
      expect(result).toEqual(mockData);
    });

    it('should handle API errors', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response);

      await expect(apiRequest('/movie/999999')).rejects.toThrow(
        'API Error: 404 - Not Found'
      );
    });

    it('should handle network errors', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

      await expect(apiRequest('/discover/movie')).rejects.toThrow(
        'Network error'
      );
    });
  });
});
