import axios from 'axios';
import { normalize } from './utils';
import { API_KEY, WEATHER_URI } from './config';
import cities from './mock-data//cities.json';
//
// get five-day forecast based on a city id
//
export const getHourlyForecast = async (cityId, units = 'metric') => {
  const url = `${WEATHER_URI}/forecast?id=${cityId}&units=${units}&APPID=${API_KEY}`;
  const res = await axios.get(url);
  return normalize(res.data.list);
};
//
// Odd that the weather API does not provide a city lookup, however, they do supply static
// city data to download (this data set limited to GB cities only)
//
export const filterCities = async filter =>
  new Promise(resolve =>
    process.nextTick(() =>
      resolve(
        cities.filter(city =>
          city.name.toLowerCase().includes(filter.toLowerCase())
        )
      )
    )
  );

const api = {
  getHourlyForecast,
  filterCities
};

export default api;
