import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { formatDateString } from '../utils';

const WeatherCard = ({
  dataKey,
  handleCardClick,
  color,
  icon,
  max,
  min,
  date
}) => (
  <Card
    raised
    link
    datakey={dataKey}
    onClick={handleCardClick}
    style={{ backgroundColor: color }}
  >
    <Card.Content>
      <Image floated="right" size="mini" src={icon} />
      <Card.Header>{formatDateString(date)}</Card.Header>
      <Card.Meta style={{ color: 'black' }}>{max} ℃</Card.Meta>
      <Card.Meta>{min} ℃</Card.Meta>
    </Card.Content>
  </Card>
);

WeatherCard.defaultProps = {
  color: undefined
};

WeatherCard.propTypes = {
  dataKey: PropTypes.string.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired
};

export default WeatherCard;
