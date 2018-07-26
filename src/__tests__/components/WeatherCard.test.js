import React from 'react';
import { shallow } from 'enzyme';
import WeatherCard from '../../components/WeatherCard';

const setup = overrideProps => {
  const props = {
    dataKey: '123456',
    handleCardClick: jest.fn(() => 'handleCardClick'),
    color: undefined,
    icon: '10d',
    max: 29,
    min: 22,
    date: new Date('2017-07-22T08:19:30.402Z'),
    ...overrideProps
  };

  const wrapper = shallow(<WeatherCard {...props} />);

  return {
    props,
    wrapper,
    card: wrapper.find('Card'),
    cardContent: wrapper.find('CardContent'),
    cardHeader: wrapper.find('CardHeader'),
    image: wrapper.find('Image'),
    cardMeta: wrapper.find('CardMeta')
  };
};

describe('WeatherCard component', () => {
  test('smoke test', () => {
    const { wrapper } = setup({});
    expect(wrapper).toBeDefined();
  });

  test('dataKey is set correctly', () => {
    const { card, props } = setup({});
    expect(card.prop('datakey')).toEqual(props.dataKey);
  });

  test('onClick is fired once', () => {
    const { card, props } = setup({});
    card.prop('onClick')();
    expect(props.handleCardClick.mock.calls.length).toBe(1);
  });

  test('CardHeader set correctly', () => {
    const { cardHeader } = setup({});
    expect(cardHeader.render().text()).toEqual('Sat 22 Jul');
  });

  test('The two CardMeta set correctly', () => {
    const { cardMeta } = setup({});
    expect(
      cardMeta
        .at(0)
        .render()
        .text()
    ).toEqual('29 ℃');

    expect(
      cardMeta
        .at(1)
        .render()
        .text()
    ).toEqual('22 ℃');
  });
});
