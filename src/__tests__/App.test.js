import React from 'react';
import { shallow } from 'enzyme';
import createMockStore from 'redux-mock-store';
import ConnectedApp, { App } from '../App';

const setup = propOverrides => {
  const key = '123456';
  const weather = {
    [key]: {
      date: new Date('2018-07-29T00:00:00.000Z'),
      tempMax: 20,
      tempMin: 14,
      icon: 'http://openweathermap.org/img/w/10d.png',
      hourly: [
        {
          date: new Date('2018-07-28T16:00:00.000Z'),
          temp: 15,
          icon: 'http://openweathermap.org/img/w/02n.png'
        }
      ]
    }
  };

  const props = {
    fetchCities: jest.fn(),
    fetchWeather: jest.fn(),
    cities: [],
    weather,
    isLoading: false,
    ...propOverrides
  };

  const wrapper = shallow(<App {...props} />);

  return {
    wrapper,
    key,
    weather,
    props,
    ...propOverrides
  };
};

describe('The App component', () => {
  test('Smoke test', () => {
    const { wrapper } = setup();
    expect(wrapper).toBeDefined();
  });

  test('loadCities should not be called when filter < 3 characters', () => {
    const { wrapper } = setup();
    wrapper.instance().loadCities = jest.fn();
    wrapper.update();
    wrapper.instance().handleSearchChange(null, { searchQuery: 'Lo' });
    expect(wrapper.instance().loadCities).toHaveBeenCalledTimes(0);
  });

  test('loadCities called when filter has at least 3 characters', () => {
    const { wrapper } = setup();
    wrapper.instance().loadCities = jest.fn();
    wrapper.update();
    wrapper.instance().handleSearchChange(null, { searchQuery: 'Lon' });
    expect(wrapper.instance().loadCities).toHaveBeenCalledTimes(1);
  });

  test('fetchCities called when filter has at least 3 characters', () => {
    const { wrapper } = setup();
    wrapper.instance().handleSearchChange(null, { searchQuery: 'Lon' });
    expect(wrapper.instance().props.fetchCities).toHaveBeenCalledTimes(1);
  });

  test('loadWeather is called when a city is selected', () => {
    const { wrapper, key } = setup();
    wrapper.instance().loadWeather = jest.fn();
    wrapper.update();
    wrapper.instance().handleChange(null, { value: key });
    expect(wrapper.instance().loadWeather).toHaveBeenCalledTimes(1);
  });

  test('fetchWeather is called when a daily forecast is selected', () => {
    const { wrapper, key } = setup();
    wrapper.instance().handleChange(null, { value: key });
    expect(wrapper.instance().props.fetchWeather).toHaveBeenCalledTimes(1);
  });

  test("when handleCardClick is called, the selected state is assigned the card's key", () => {
    const { wrapper, key } = setup();
    wrapper.setState({ selected: key });
    wrapper.instance().handleCardClick(null, { datakey: key });
    expect(wrapper.state().selected).toEqual(key);
  });

  test('unselected WeatherCard has color of undefined', () => {
    const { wrapper } = setup();
    expect(wrapper.find('WeatherCard').prop('color')).toEqual(undefined);
  });

  test("selected WeatherCard has color 'whitesmoke", () => {
    const { wrapper, key } = setup();
    wrapper.setState({ selected: key });
    expect(wrapper.find('WeatherCard').prop('color')).toEqual('whitesmoke');
  });

  test('when weather has no items CardGroup itemsPerRow is set to 1', () => {
    const { wrapper } = setup({ weather: {} });
    expect(wrapper.find('CardGroup').prop('itemsPerRow')).toEqual(1);
  });

  test('just for coverage, test connect HOC', () => {
    const { props } = setup();
    const store = createMockStore([])({});
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper).toBeDefined();
  });
});
