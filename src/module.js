import api from './api';
import { BASE_ICON_URL } from './config';
import { groupBy, mode } from './utils';

//
// Group the hourly weather forecasts by day to facilitate UI
//
export const normalize = hourly => {
  const keyFn = value => value.dt_txt.split(' ')[0];
  const daily = groupBy(keyFn, hourly);
  const result = {};
  Object.keys(daily).forEach(key => {
    const value = daily[key];
    result[key] = {
      date: new Date(key),
      tempMax: Math.round(
        Math.max(...value.data.map(data => data.main.temp_max))
      ),
      tempMin: Math.round(
        Math.min(...value.data.map(data => data.main.temp_min))
      ),
      icon: `${BASE_ICON_URL}/${mode(
        value.data.map(data => data.weather[0].icon)
      )}.png`,
      hourly: value.data.map(data => ({
        date: new Date(data.dt_txt),
        temp: Math.round(data.main.temp),
        icon: `${BASE_ICON_URL}/${data.weather[0].icon}.png`
      }))
    };
  });
  return result;
};

export const FETCH_CITIES_REQUEST = 'FETCH_CITIES_REQUEST';
export const FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS';

export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';

export const types = {
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS
};

export const fetchCitiesRequest = () => ({ type: FETCH_CITIES_REQUEST });
export const fetchCitiesSuccess = payload => ({
  type: FETCH_CITIES_SUCCESS,
  payload
});
export const fetchCities = filter => async dispatch => {
  dispatch(fetchCitiesRequest());
  const data = await api.filterCities(filter);
  dispatch(fetchCitiesSuccess(data));
};

export const fetchWeatherRequest = () => ({ type: FETCH_WEATHER_REQUEST });
export const fetchWeatherSuccess = payload => ({
  type: FETCH_WEATHER_SUCCESS,
  payload
});
export const fetchWeather = cityId => async dispatch => {
  dispatch(fetchWeatherRequest());
  const data = await api.getHourlyForecast(cityId);
  dispatch(fetchWeatherSuccess(data));
};

export const actions = {
  fetchCitiesRequest,
  fetchCitiesSuccess,
  fetchCities,
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeather
};

const ACTION_HANDLERS = {
  [FETCH_CITIES_REQUEST]: state => ({ ...state, isLoading: true }),
  [FETCH_CITIES_SUCCESS]: (state, action) => ({
    ...state,
    cities: action.payload.map(city => ({ value: city.id, text: city.name })),
    isLoading: false
  }),
  [FETCH_WEATHER_REQUEST]: state => ({ ...state, isLoading: true }),
  [FETCH_WEATHER_SUCCESS]: (state, action) => ({
    ...state,
    weather: normalize(action.payload.list),
    isLoading: false
  })
};

export const initialState = {
  cities: [],
  weather: {},
  isLoading: false
};

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
