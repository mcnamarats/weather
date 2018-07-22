import React from 'react';
import { shallow } from 'enzyme';
import SearchDropdown from '../../components/SearchDropdown';
import cities from '../../mock-data/cities.json';

const data = cities.map(city => ({ value: city.id, text: city.name }));

const setup = propOverrides => {
  const props = {
    data,
    handleChange: jest.fn(() => 'handleChange'),
    handleSearchChange: jest.fn(() => 'handleSearchChange'),
    ...propOverrides
  };

  const wrapper = shallow(<SearchDropdown {...props} />);

  return {
    props,
    wrapper,
    dropdown: wrapper.find('Dropdown')
  };
};

describe('SearchDropdown component', () => {
  test('smoke test', () => {
    const { wrapper } = setup({});
    expect(wrapper).toBeDefined();
  });

  test('override the default placeholder text', () => {
    const placeholder = 'Rick rolled';
    const { dropdown } = setup({ placeholder });
    expect(dropdown.prop('placeholder')).toEqual(placeholder);
  });

  test('onSearchChange gets fired once', () => {
    const { dropdown, props } = setup({});
    dropdown.prop('onSearchChange')();
    expect(props.handleSearchChange.mock.calls.length).toBe(1);
  });

  test('onChange gets fired once', () => {
    const { dropdown, props } = setup({});
    dropdown.prop('onChange')();
    expect(props.handleChange.mock.calls.length).toBe(1);
  });
});
