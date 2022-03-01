import React, { useState, useEffect } from 'react';

import './Row.css';
import axios from './axios';

const base_url = 'https://image.tmdb.org/t/p/w500';

const Row = ({ title, fetchUrl, isLargeRow, getMovieHandler }) => {
	const [movies, setMovies] = useState([]);

	const getMovieData = async () => {
		const request = await axios.get(fetchUrl);
		setMovies(request.data.results);
	};

	useEffect(() => {
		getMovieData();
	}, [fetchUrl]);

	const setMovieHandler = (movie) => {
		getMovieHandler(movie);
	};

	return (
		<div className="row">
			<h2 className="row__title">{title}</h2>

			<div className="row__posters">
				{movies.map((movie) => (
					<img
						onClick={() => setMovieHandler(movie)}
						key={movie.id}
						className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
						src={`${base_url}${
							isLargeRow ? movie.poster_path : movie.backdrop_path
						}`}
					/>
				))}
			</div>
		</div>
	);
};

export default Row;
