import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reducer, { actions, types, initialState, normalize } from '../module';
import weather from '../mock-data/weather.json';

const mockStore = configureMockStore([thunk]);

describe('Weather Redux module', () => {
  describe('Cities actions', () => {
    test('creates an action for fetch request', () => {
      const expected = { type: types.FETCH_CITIES_REQUEST };
      expect(actions.fetchCitiesRequest()).toEqual(expected);
    });

    test('creates and action for for fetch success', () => {
      const payload = 'payload';
      const expected = { type: types.FETCH_CITIES_SUCCESS, payload: 'payload' };
      expect(actions.fetchCitiesSuccess(payload)).toEqual(expected);
    });

    test('creates FETCH_CITIES_SUCCESS when finished', () => {
      const store = mockStore({ cities: [] });
      const expected = [
        {
          type: types.FETCH_CITIES_REQUEST
        },
        {
          type: types.FETCH_CITIES_SUCCESS,
          payload: [{ id: 2650225, name: 'Edinburgh (GB)' }]
        }
      ];
      store.dispatch(actions.fetchCities('Edinburg')).then(() => {
        expect(store.getActions()).toEqual(expected);
      });
    });
  });

  describe('Cities reducer', () => {
    test('returns initial state for undefined action', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    test('handles FETCH_CITIES_REQUEST', () => {
      expect(
        reducer(initialState, { type: types.FETCH_CITIES_REQUEST }).isLoading
      ).toBeTruthy();
    });

    test('handles FETCH_CITIES_SUCCESS', () => {
      const payload = [{ id: 12, name: 'name' }];
      const expected = {
        cities: [{ value: payload[0].id, text: payload[0].name }],
        isLoading: false,
        weather: {}
      };
      expect(
        reducer(initialState, { type: types.FETCH_CITIES_SUCCESS, payload })
      ).toEqual(expected);
    });
  });

  describe('Weather actions', () => {
    test('creates an action for fetch request', () => {
      const expected = { type: types.FETCH_WEATHER_REQUEST };
      expect(actions.fetchWeatherRequest()).toEqual(expected);
    });

    test('creates and action for for fetch success', () => {
      const payload = 'payload';
      const expected = {
        type: types.FETCH_WEATHER_SUCCESS,
        payload: 'payload'
      };
      expect(actions.fetchWeatherSuccess(payload)).toEqual(expected);
    });

    test('creates FETCH_WEATHER_SUCCESS when finished', () => {
      const store = mockStore({ weather: {} });
      const expected = [
        {
          type: types.FETCH_WEATHER_REQUEST
        },
        {
          type: types.FETCH_WEATHER_SUCCESS,
          payload: normalize(weather.list)
        }
      ];
      store.dispatch(actions.fetchWeather('12345')).then(() => {
        store.getActions()[1].payload = normalize(
          store.getActions()[1].payload.list
        );
        expect(store.getActions()).toEqual(expected);
      });
    });

    describe('Weather reducer', () => {
      test('returns initial state for undefined action', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
      });

      test('handles FETCH_WEATHER_REQUEST', () => {
        expect(
          reducer(initialState, { type: types.FETCH_WEATHER_REQUEST }).isLoading
        ).toBeTruthy();
      });

      test('handles FETCH_WEATHER_SUCCESS', () => {
        const expected = {
          cities: [],
          isLoading: false,
          weather: normalize(weather.list)
        };
        expect(
          reducer(initialState, {
            type: types.FETCH_WEATHER_SUCCESS,
            payload: weather
          })
        ).toEqual(expected);
      });
    });
  });
});
