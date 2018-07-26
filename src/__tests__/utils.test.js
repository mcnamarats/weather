import utils from '../utils';
import weather from '../mock-data/weather.json';

describe('The utility functions', () => {
  describe('mode function', () => {
    test('return null for zero length array', () => {
      expect(utils.mode([])).toBeNull();
    });
    test('return 5 as the most frequent array element', () => {
      expect(utils.mode([1, 2, 3, 4, 4, 5, 5, 5])).toBe(5);
    });
  });
  const date = new Date('December 17, 1995 13:24:00');
  describe('formatTimeString function', () => {
    test('returns time in military format', () => {
      expect(utils.formatTimeString(date)).toBe('13:24');
    });
  });

  describe('formatDateString function', () => {
    test("returns 'Sun 17 Dec' as the date string", () => {
      expect(utils.formatDateString(date)).toBe('Sun 17 Dec');
    });
  });

  describe('normaize function', () => {
    const forecasts = utils.normalize(weather.list);
    test('There are 6 weather forcasts grouped by day of year', () => {
      expect(Object.keys(forecasts).length).toEqual(6);
    });
    test('Each daily forecast has at least one hourly forecast', () => {
      const counts = Object.values(forecasts).map(
        forecast => forecast.hourly.length
      );
      expect(Math.min(...counts)).toBeGreaterThan(0);
    });
  });
});
