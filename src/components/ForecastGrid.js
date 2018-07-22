import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { formatTimeString } from '../utils';

const ForecastGrid = ({ hourly, numColumns }) => (
  <Grid columns={numColumns} padded celled>
    {hourly.map(forecast => (
      <Grid.Column width={2} key={forecast.date.getTime()}>
        <Image size="mini" src={forecast.icon} />
        <p>{formatTimeString(forecast.date)}</p>
        <p>{Math.round(forecast.temp)} ℃</p>
      </Grid.Column>
    ))}
  </Grid>
);

ForecastGrid.propTypes = {
  numColumns: PropTypes.number.isRequired,
  hourly: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.object.isRequired,
      temp: PropTypes.number.isRequired,
      icon: PropTypes.string.isRequired
    })
  ).isRequired
};

export default ForecastGrid;
