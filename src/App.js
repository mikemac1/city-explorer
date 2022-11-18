import React from 'react';
import axios from 'axios';
import Weather from './weather.js'

import Alert from 'react-bootstrap/Alert';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalShown: false,
      city: '',
      cityData: {},
      isError: false,
      errorMessage: '',
      weather: [],
      showLat: '',
      showLong: '',
      showMap: {},
      errorCode: ''
    }
  }
  handleCityInput = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  handleWeather = async () => {
    let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?city=${this.state.city}&lon=${this.state.showLong}&lat=${this.state.showLat}`;
    // console.log(weatherUrl);
    let weather = await axios.get(weatherUrl);
    console.log(weather);
    this.setState({
      weather: weather.data
    })
    // console.log(this.state.weather);
    // 
  }

  closeModal = () => {
    console.log('Inside of close modal');
    this.setState({
      modalShown: false
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
        isError: false
      }, this.handleWeather);
      // setstate is async



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
    
    // let showCity = '';
    // let showLat = '';
    // let showLong = '';

    // let showMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=11`;

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

        {this.state.weather.length&&<Weather 
          showModal={this.state.modalShown}
          stopModal={this.closeModal}
          displayCity={this.state.cityData.display_name}
          displayMap={this.state.showMap}
          spellCity={this.state.city.name}
          disLat={this.state.cityData.lat}
          disLon={this.state.cityData.lon}
          weatherForecast={this.state.weather}
        />}

        <footer>
          <p><span>&copy;</span>  Mike McCarty</p>
        </footer>

      </>
    );
  }
}


export default App;