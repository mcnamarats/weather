import React, { Component } from 'react';
import { Card, Container, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCities, fetchWeather } from './module';
import SearchDropdown from './components/SearchDropdown';
import WeatherCard from './components/WeatherCard';
import ForecastGrid from './components/ForecastGrid';
import WeatherLoader from './components/WeatherLoader';

export class App extends Component {
  state = {
    selected: null
  };
  //
  // load cities on a city filter
  //
  loadCities = filter => {
    this.props.fetchCities(filter);
  };
  //
  // get the hourly forecasts by selected cityId
  //
  loadWeather = cityId => {
    this.props.fetchWeather(cityId);
  };
  //
  // when the user enters search criteria in the search dropdown,
  // call the API to get any matches
  //
  handleSearchChange = (e, { searchQuery }) => {
    // clear selected state to remove previous hourly forecasts
    this.setState({ selected: null });
    // debounce - at least 3 characters before calling the API
    if (searchQuery.length > 2) this.loadCities(searchQuery);
  };
  //
  // A city has been selected, lookup the 5-day forecasts
  //
  handleChange = (e, { value }) => {
    this.loadWeather(value);
  };
  //
  // when a daily forecast card is selected, setting the 'selected' state will
  // render the hourly forecasts.  Set the background color for selected card, and
  // reset color for previously selected
  //
  handleCardClick = (e, { datakey }) => {
    this.setState({ selected: datakey });
  };

  render() {
    const { weather, isLoading } = this.props;
    const { selected } = this.state;
    return (
      <Container>
        <WeatherLoader active={isLoading} />
        <Header>Weather</Header>
        <SearchDropdown
          data={this.props.cities}
          handleSearchChange={this.handleSearchChange}
          handleChange={this.handleChange}
          placeholder="Enter city name..."
        />
        <br />
        <Card.Group itemsPerRow={Object.keys(weather).length || 1}>
          {Object.keys(weather).map(key => {
            const value = weather[key];
            return (
              <WeatherCard
                key={key}
                dataKey={key}
                handleCardClick={this.handleCardClick}
                color={selected === key ? 'whitesmoke' : undefined}
                icon={value.icon}
                min={value.tempMin}
                max={value.tempMax}
                date={value.date}
              />
            );
          })}
        </Card.Group>
        {weather[selected] && (
          <ForecastGrid
            hourly={weather[selected].hourly}
            numColumns={weather[selected].hourly.length}
          />
        )}
      </Container>
    );
  }
}

App.propTypes = {
  fetchCities: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  fetchWeather: PropTypes.func.isRequired,
  weather: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default connect(
  state => state,
  {
    fetchCities,
    fetchWeather
  }
)(App);
