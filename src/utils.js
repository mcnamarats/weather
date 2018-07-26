import { BASE_ICON_URL } from './config';
//
// brute force mode implementation, that returns the most
// frequent element of an array
//
export const mode = array => {
  if (array.length === 0) return null;
  const modeMap = {};
  let maxEl = array[0];
  let maxCount = 1;

  array.forEach(el => {
    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el] += 1;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  });

  return maxEl;
};
//
// format a military time string from a date. For example, 02:00, 13:00
//
export const formatTimeString = date =>
  date.toLocaleTimeString(
    undefined /* don't care about the locale, not for this at least */,
    {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    }
  );
//
// format a date string from a date.  For example 'Fri Dec 25'
//
export const formatDateString = date =>
  date.toLocaleDateString(
    undefined /* don't really care about the locale, not for this at least */,
    {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }
  );
//
// Group the hourly weather forecasts by day to facilitate UI
//
export const normalize = forecasts => {
  const daily = forecasts.reduce((accum, forecast) => {
    const key = forecast.dt_txt.split(' ')[0];
    /* eslint-disable no-param-reassign */
    accum[key] = accum[key] || { hourly: [] };
    accum[key].hourly.push({
      temp: forecast.main.temp,
      temp_max: forecast.main.temp_max,
      temp_min: forecast.main.temp_min,
      date: new Date(forecast.dt * 1000),
      icon: `${BASE_ICON_URL}/${forecast.weather[0].icon}.png`
    });
    return accum;
  }, {});
  // as we do not have access to the daily forecast (paid API), we estimate min/max temp based
  // on the hourly forecast (falls short when less than a full day's hourly forecast)
  Object.keys(daily).forEach(key => {
    const value = daily[key];
    value.date = new Date(key);
    value.max = Math.round(
      Math.max(...value.hourly.map(hourly => hourly.temp_max))
    );
    value.min = Math.round(
      Math.min(...value.hourly.map(hourly => hourly.temp_min))
    );
    value.icon = mode(value.hourly.map(el => el.icon));
  });
  return daily;
};

export default {
  mode,
  formatTimeString,
  formatDateString,
  normalize
};
