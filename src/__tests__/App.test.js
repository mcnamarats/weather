import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

const setup = () => {
  const wrapper = shallow(<App />);
  const timestamp = '1532620800000';

  return {
    wrapper,
    timestamp,
    weather: {
      [timestamp]: {
        date: new Date(timestamp / 1000),
        icon: '10d',
        min: 0,
        max: 1,
        hourly: []
      }
    }
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

  test('loadWeather is called when a city is selected', () => {
    const { wrapper, timestamp } = setup();
    wrapper.instance().loadWeather = jest.fn();
    wrapper.update();
    wrapper.instance().handleChange(null, { value: timestamp });
    expect(wrapper.instance().loadWeather).toHaveBeenCalledTimes(1);
  });

  test("when handleCardClick is called, the selected state is assigned the card's key", () => {
    const { wrapper, weather, timestamp } = setup();
    wrapper.setState({ weather, selected: timestamp });
    wrapper.instance().handleCardClick(null, { datakey: timestamp });
    expect(wrapper.state().selected).toEqual(timestamp);
  });

  test('invoking loadCities sets the state appropriately', async () => {
    const { wrapper } = setup();
    await wrapper.instance().loadCities('London');
    expect(wrapper.state().cities.length).toBeGreaterThan(0);
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
    const { wrapper, weather, timestamp } = setup();
    wrapper.setState({ weather, selected: timestamp });
    expect(wrapper.find('WeatherCard').prop('color')).toEqual('whitesmoke');
  });

  /*
  test("selected WeatherCard has color 'whitesmoke", () => {
    const { wrapper, weather, timestamp } = setup();
    wrapper.setState({ weather, selected: timestamp });
    console.log(weather[wrapper.state().selected]);
    console.log(wrapper.debug());
  });
  */
});
