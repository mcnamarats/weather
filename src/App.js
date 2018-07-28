import React, { Component } from 'react';
import { Card, Container, Header } from 'semantic-ui-react';
import SearchDropdown from './components/SearchDropdown';
import './App.css';
import api from './api';
import WeatherCard from './components/WeatherCard';
import ForecastGrid from './components/ForecastGrid';
import { groupBy, mode } from './utils';
import { BASE_ICON_URL } from './config';
//
// Group the hourly weather forecasts by day to facilitate UI
//
export const normalize = hourly => {
  const keyFn = value => value.dt_txt.split(' ')[0];
  const daily = groupBy(keyFn, hourly);
  const result = {};
  Object.keys(daily).forEach(key => {
    const value = daily[key];
    result[key] = {
      date: new Date(key),
      tempMax: Math.round(
        Math.max(...value.data.map(data => data.main.temp_max))
      ),
      tempMin: Math.round(
        Math.min(...value.data.map(data => data.main.temp_min))
      ),
      icon: `${BASE_ICON_URL}/${mode(
        value.data.map(data => data.weather[0].icon)
      )}.png`,
      hourly: value.data.map(data => ({
        date: new Date(data.dt_txt),
        temp: Math.round(data.main.temp),
        icon: `${BASE_ICON_URL}/${data.weather[0].icon}.png`
      }))
    };
  });
  return result;
};

class App extends Component {
  state = {
    weather: {},
    cities: [],
    selected: null
  };
  //
  // load cities from API based on a city filter
  //
  loadCities = async filter => {
    const cities = await api.filterCities(filter);
    // data shape reqired by semaitic-ui
    this.setState({
      cities: cities.map(city => ({ value: city.id, text: city.name }))
    });
  };
  //
  // call the weather API to get the hourly forecasts by cityId
  //
  loadWeather = async cityId => {
    const weather = await api.getHourlyForecast(cityId);
    this.setState({ weather: normalize(weather) });
  };
  //
  // when the user enters search criteria in the search dropdown,
  // call the API to get any matches
  //
  handleSearchChange = (e, { searchQuery }) => {
    // clear selected state to remove previous hourly forecasts
    this.setState({ selected: null });
    // debounce - at least 3 characters before calling the API
    return searchQuery.length < 3
      ? this.setState({ cities: [] })
      : this.loadCities(searchQuery);
  };
  //
  // A city has been selected, lookup the 5-day forecasts
  //
  handleChange = (e, { value }) => this.loadWeather(value);
  //
  // when a daily forecast card is selected, setting the 'selected' state will
  // render the hourly forecasts.  Set the background color for selected card, and
  // reset color for previously selected
  //
  handleCardClick = (e, { datakey }) => {
    const weather = { ...this.state.weather };
    this.setState({ selected: datakey, weather });
  };

  render() {
    const { weather, selected } = this.state;
    return (
      <Container>
        <Header>Weather</Header>
        <SearchDropdown
          data={this.state.cities}
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
        {this.state.weather[selected] && (
          <ForecastGrid
            hourly={weather[selected].hourly}
            numColumns={weather[selected].hourly.length}
          />
        )}
      </Container>
    );
  }
}

export default App;
