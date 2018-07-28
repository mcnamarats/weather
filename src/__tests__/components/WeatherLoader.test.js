import React from 'react';
import { shallow } from 'enzyme';
import WeatherLoader from '../../components/WeatherLoader';

describe('WeatherLoader component', () => {
  test('gets rendered', () => {
    expect(shallow(<WeatherLoader active />)).toBeDefined();
  });
});
