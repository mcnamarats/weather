import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';

const setup = propOverrides => {
  const props = {
    fetchCities: jest.fn(),
    cities: [],
    isLoading: false
  };

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
    // console.log(wrapper.instance().props.fetchCities);
    wrapper.instance().handleSearchChange(null, { searchQuery: 'Lon' });
    expect(wrapper.instance().props.fetchCities).toHaveBeenCalledTimes(1);
  });

  test('loadWeather is called when a city is selected', () => {
    const { wrapper, timestamp } = setup();
    wrapper.instance().loadWeather = jest.fn();
    wrapper.update();
    wrapper.instance().handleChange(null, { value: timestamp });
    expect(wrapper.instance().loadWeather).toHaveBeenCalledTimes(1);
  });

  test("when handleCardClick is called, the selected state is assigned the card's key", () => {
    const { wrapper, weather, key } = setup();
    wrapper.setState({ weather, selected: key });
    wrapper.instance().handleCardClick(null, { datakey: key });
    expect(wrapper.state().selected).toEqual(key);
  });

  test('invoking loadWeather sets the state appropriately', async () => {
    const { wrapper } = setup();
    await wrapper.instance().loadWeather(12345);
    expect(Object.keys(wrapper.state().weather).length).toBeGreaterThan(0);
  });

  test('unselected WeatherCard has color of undefined', () => {
    const { wrapper, weather } = setup();
    wrapper.setState({ weather });
    expect(wrapper.find('WeatherCard').prop('color')).toEqual(undefined);
  });

  test("selected WeatherCard has color 'whitesmoke", () => {
    const { wrapper, weather, key } = setup();
    wrapper.setState({ weather, selected: key });
    expect(wrapper.find('WeatherCard').prop('color')).toEqual('whitesmoke');
  });
});
