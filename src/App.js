import React from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
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
      errorCode: ''
    }
  }
  handleCityInput = (e) => {
    this.setState({
      city: e.target.value
    })
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
      });
      console.log(this.state.cityData);
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        errorCode: error.code,
        isError: true
      })
    }
  }


  render() {

    let showError = '';
    let showCity = '';
    let showLat = '';
    let showLong = '';

    let showMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=11`;

    if (this.state.isError) {
      showError = 
      <article>
      <Alert variant="danger">Error Code: {this.state.errorCode}</Alert>
      <Alert  variant="danger">Message: {this.state.errorMessage}</Alert>
      </article>
    } else {
      showCity = this.state.cityData.display_name;
      showLat = this.state.cityData.lat;
      showLong = this.state.cityData.lon;
    }


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

          <Modal show={this.state.modalShown} onHide={this.closeModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title>City - {showCity}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <img src={showMap} alt={this.state.city.name + ' area map.'} />
              <h3>Latitude: {showLat}</h3>
              <h3>Longitude: {showLong}</h3>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.closeModal} variant="secondary">Close</Button>
            </Modal.Footer>
          </Modal>
          <footer>
            <p><span>&copy;</span>  Mike McCarty</p>
          </footer>
        
      </>
    );
  }
}


export default App;