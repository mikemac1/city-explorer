import React from 'react';

import Alert from 'react-bootstrap/Alert';

import './App.css';

class Movie extends React.Component {

    render() {

        let alertMovieContent = this.props.moviesShown.map((movieObject, index) => {
            return (
              <article key={index}>
                <Alert variant="success">
                  <Alert.Heading>Movie Title: {movieObject.title}</Alert.Heading>
                  <img src={movieObject.posterPath} alt="Movie poster for {movieObject.title}" width='40%' />
                  <p><span className='alertBold'>Release Date: </span>{movieObject.relDate}</p>
                  <p><span className='alertBold'>Viewers Rating Average: </span>{movieObject.voteAvg}</p>
                  <hr />
                  <p className="mb-0"><span className='alertBold'>Movie Summary: </span>{movieObject.overview}</p>
                </Alert>
                <hr />
              </article>
            );
          });

        return (
            <>
                <div>{alertMovieContent}</div>
            </>
        );
    }
}

export default Movie;