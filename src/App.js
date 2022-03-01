import React, { useState } from 'react';
import './App.css';
import Modal from 'react-modal';

import Nav from './Nav';
import Row from './Row';
import Banner from './Banner';
import MovieDetails from './MovieDetails';
import requests from './requests';

const modalStyles = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: '#000',
		zIndex: 10,
	},
	content: {
		backgroundColor: '#141414',
		background: '#141414',
		position: 'absolute',
		top: '5px',
		left: '5px',
		right: '5px',
		bottom: '5px',
		overflow: 'auto',
		border: 'none',
		WebkitOverflowScrolling: 'touch',
		borderRadius: '4px',
		outline: 'none',
		padding: 0,
	},
};

function App() {
	const [movie, setMovie] = useState();

	const closeModal = () => {
		setMovie(null);
	};

	console.log(movie);

	return (
		<div className="app">
			<Nav />
			{movie && (
				<Modal isOpen={movie} style={modalStyles} contentLabel="Example Modal">
					<MovieDetails closeMovie={closeModal} movie={movie} />
				</Modal>
			)}
			<Banner getMovieHandler={setMovie} />
			<div className="rows">
				<Row
					isLargeRow
					title="NETFLIX ORIGINALS"
					fetchUrl={requests.fetchNetflixOriginals}
					getMovieHandler={setMovie}
				/>
				<Row
					title="Trending Now"
					fetchUrl={requests.fetchTrending}
					getMovieHandler={setMovie}
				/>
				<Row
					title="Top Rated"
					fetchUrl={requests.fetchTopRated}
					getMovieHandler={setMovie}
				/>
				<Row
					title="Action Films"
					fetchUrl={requests.fetchActionMovies}
					getMovieHandler={setMovie}
				/>
				<Row
					title="Comedy Films"
					fetchUrl={requests.fetchComedyMovies}
					getMovieHandler={setMovie}
				/>
				<Row
					title="Horror Films"
					fetchUrl={requests.fetchHorrorMovies}
					getMovieHandler={setMovie}
				/>
				<Row
					title="Romance Films"
					fetchUrl={requests.fetchRomanceMovies}
					getMovieHandler={setMovie}
				/>
				<Row
					title="Documentaries"
					fetchUrl={requests.fetchDocumentaries}
					getMovieHandler={setMovie}
				/>
			</div>
		</div>
	);
}

export default App;
