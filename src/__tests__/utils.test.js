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

  describe('groupBy function', () => {
    const data = [
      { key: '12', value: 'value1' },
      { key: '12', value: 'value2' },
      { key: '13', value: 'value3' }
    ];
    const grouped = utils.groupBy(value => value.key, data);
    test('there are two grouped elements', () => {
      expect(Object.keys(grouped).length).toEqual(2);
      expect(grouped['12'].data.length).toEqual(2);
      expect(grouped['13'].data.length).toEqual(1);
    });
  });
});
