import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Weather extends React.Component {

    render() {

        let listItem = this.props.weatherForecast.map((data, index) => {
        return (
        <div key={index}>
        <li>Date: {data.date}/Forecast: {data.description}</li>
        </div>
       );
        });
        
        return (
            <>

                <Modal show={this.props.showModal} onHide={this.props.stopModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title>City - {this.props.displayCity}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {/* <img src={this.props.displayMap} alt={this.props.spellCity + ' area map.'} /> */}
                        <h2>Weather Forecast for {this.props.spellCity}</h2>
                        <h3>Latitude: {this.props.disLat}</h3>
                        <h3>Longitude: {this.props.disLon}</h3>
                        <ul>{listItem}</ul>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.props.stopModal} variant="secondary">Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Weather;