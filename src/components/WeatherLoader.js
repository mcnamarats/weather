import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';

const WeatherLoader = ({ active }) => <Loader active={active} />;

WeatherLoader.propTypes = {
  active: PropTypes.bool.isRequired
};

export default WeatherLoader;
