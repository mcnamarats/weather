import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

const SearchDropdown = ({
  data,
  handleChange,
  handleSearchChange,
  placeholder
}) => (
  <Dropdown
    fluid
    options={data}
    search
    onSearchChange={handleSearchChange}
    onChange={handleChange}
    selectOnNavigation={false}
    selection
    placeholder={placeholder}
    noResultsMessage="Try another search."
    icon="search"
  />
);

SearchDropdown.defaultProps = {
  placeholder: 'Enter a search criteria'
};

SearchDropdown.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired
};

export default SearchDropdown;
