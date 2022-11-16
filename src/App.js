import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      isError: false,
      errorMessage: ''
    }
  }
  handleCityInput = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  handleCitySubmit = async (e) => {

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;

    try {
      e.preventDefault();

      let urlData = await axios.get(url);

      this.setState({
        cityData: urlData.data[0],
        isError: false
      });
      console.log(this.state.cityData);
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        isError: true
      })
    }
  }


  render() {

    let showError = '';
    let showCity = '';
    let showLat = '';
    let showLong = '';

    let showMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`;

    if (this.state.isError) {
      showError = <h3>{this.state.errorMessage}</h3>
    } else {
      showCity = <li>City: {this.state.cityData.display_name}</li>;
      showLat = <li>Latitude: {this.state.cityData.lat}</li>;
      showLong = <li>Longitude: {this.state.cityData.lon}</li>;
    }


    return (
      <>
        <body>
          <header>
            <h1>DATA FROM LOCATIONIQ</h1>
          </header>
          <main>
            <form onSubmit={this.handleCitySubmit}>
              <label>Pick A City
                <input name="city" type='text' onChange={this.handleCityInput} />
              </label>
              <button type="submit" variant="success">Explore</button>
              <article>
                {showError}
              </article>
              <ul>
                {showCity}
                {showLat}
                {showLong}
              </ul>
            </form>
            <img
              src={showMap}
              alt={this.state.city.name + ' area map.'}
            />
          </main>
          <footer>
          </footer>
        </body>
      </>
    );
  }
}


export default App;