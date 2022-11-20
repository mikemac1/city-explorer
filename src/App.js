import React from 'react';
import axios from 'axios';
import Weather from './weather.js'
import Movie from './Movie.js'

import Alert from 'react-bootstrap/Alert';
// import Button from 'react-bootstrap/Button';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalShown: false,
      city: '',
      showLat: '',
      showLong: '',
      cityData: {},
      weatherData: [],
      movieData: [],

      isError: false,
      errorMessage: '',
      errorCode: ''
    }
  }
  handleCityInput = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  handleWeather = async () => {

    let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?city=${this.state.city}&long=${this.state.cityData.lon}&lat=${this.state.cityData.lat}`;

    let weather = await axios.get(weatherUrl);

    this.setState({
      weatherData: weather.data
    })
  }

  handleMovie = async () => {

    let movieUrl = (`${process.env.REACT_APP_SERVER}/movie?search=${this.state.city}`);

    let movie = await axios.get(movieUrl);
    console.log(movie);
    let movieData = (movie);

    this.setState({
      movieData: movieData.data
    })
  }

  closeModal = () => {
    this.setState({
      modalShown: false
    });
  };

  closeAlert = () => {
    this.setState({
      alertShown: false
    });
  };


  handleCitySubmit = async (e) => {

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;

    try {
      e.preventDefault();

      let urlData = await axios.get(url);

      this.setState({
        cityData: urlData.data[0],
        modalShown: true,
        alertShown: true,
        isError: false
      }, this.handleWeather);
      this.handleMovie();

    } catch (e) {
      this.setState({
        errorMessage: e.message,
        errorCode: e.code,
        isError: true
      })
    }
  }


  render() {

    let showError = '';

    (this.state.isError) ? showError =
      <article>
        <Alert variant="danger">Error Code: {this.state.errorCode}</Alert>
        <Alert variant="danger">Message: {this.state.errorMessage}</Alert>
      </article>
      :
      <>{this.state.cityData.display_name}
        {this.state.cityData.lat}
        {this.state.cityData.lon}
        {this.state.showMap}
      </>



    return (
      <>
        <header>
          <h1>DATA FROM LOCATIONIQ</h1>
        </header>
        <main>
          <form onSubmit={this.handleCitySubmit}>
            <label htmlFor="cityLink">Pick A City
              <input id="cityLink" name="city" type='text' onChange={this.handleCityInput} />
            </label>
            <button type="submit" variant="success">Explore</button>
          </form>
          <p>{showError}</p>
        </main>
        <Movie
          moviesShown={this.state.movieData}
        />
        {this.state.weatherData.length && <Weather
          showModal={this.state.modalShown}
          stopModal={this.closeModal}
          displayCity={this.state.cityData.display_name}
          spellCity={this.state.city.name}
          disLat={this.state.cityData.lat}
          disLon={this.state.cityData.lon}
          weatherForecast={this.state.weatherData}
        />}
        <footer>
          <p><span>&copy;</span>  Mike McCarty</p>
        </footer>
      </>
    );
  }
}


export default App;