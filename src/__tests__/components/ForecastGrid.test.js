import React from 'react';
import { shallow } from 'enzyme';
import ForecastGrid from '../../components/ForecastGrid';

const setup = propOverrides => {
  const props = {
    hourly: [
      {
        date: new Date('2017-07-22T08:19:30.402Z'),
        temp: 25,
        icon: '10d'
      }
    ],
    numColumns: 1,
    ...propOverrides
  };

  const wrapper = shallow(<ForecastGrid {...props} />);

  return {
    props,
    wrapper,
    grid: wrapper.find('Grid'),
    image: wrapper.find('Image'),
    para: wrapper.find('p')
  };
};

describe('ForecastGrid component', () => {
  test('smoke test', () => {
    const { wrapper } = setup({});
    expect(wrapper).toBeDefined();
  });

  test('number of columns for the Grid set to 2', () => {
    const { grid } = setup({ numColumns: 2 });
    expect(grid.prop('columns')).toEqual(2);
  });

  test("image src set to '10d'", () => {
    const { image } = setup({});
    expect(image.prop('src')).toEqual('10d');
  });

  test('date and temperature set correctly', () => {
    const { para } = setup({});
    expect(para.at(0).text()).toEqual('16:19');
    expect(para.at(1).text()).toEqual('25 ℃');
  });
});
