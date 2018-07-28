import api from './api';

export const FETCH_CITIES_REQUEST = 'FETCH_CITIES_REQUEST';
export const FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS';

export const types = {
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS
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

export const actions = {
  fetchCitiesRequest,
  fetchCitiesSuccess,
  fetchCities
};

const ACTION_HANDLERS = {
  [FETCH_CITIES_REQUEST]: state => ({ ...state, isLoading: true }),
  [FETCH_CITIES_SUCCESS]: (state, action) => ({
    ...state,
    cities: action.payload.map(city => ({ value: city.id, text: city.name })),
    isLoading: false
  })
};

export const initialState = {
  cities: [],
  isLoading: false
};

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
