import { filterCities, getHourlyForecast } from '../api';

describe('The api functions', () => {
  const expected = [
    { id: 2643741, name: 'City of London (GB)' },
    { id: 2643743, name: 'London (GB)' },
    { id: 7535661, name: 'London Borough of Harrow (GB)' },
    { id: 2643734, name: 'Londonderry County Borough (GB)' }
  ];

  test('filterCities returns correct data', async () => {
    expect(await filterCities('Lond')).toEqual(expected);
  });

  test('filterCities is case-insensitive', async () => {
    expect(await filterCities('LoNd')).toEqual(expected);
  });

  test('getHourlyForecast returns normalized data', async () => {
    expect(Object.keys(await getHourlyForecast(12345)).length).toEqual(5);
  });
});
