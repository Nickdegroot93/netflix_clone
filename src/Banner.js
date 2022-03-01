import React, { useEffect, useState } from 'react';

import './Banner.css';
import axios from './axios';
import requests from './requests';

const base_url = 'https://image.tmdb.org/t/p/original';

const Banner = ({ getMovieHandler }) => {
	const [movie, setMovie] = useState();

	const setMovieDetails = async () => {
		getMovieHandler(movie);
	};

	const truncate = (str, n) => {
		let trimmedString = str?.length > n ? str.substr(0, n - 1) + '...' : str;
		return (
			trimmedString?.substr(
				0,
				Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
			) + '...'
		);
	};

	const getRandomMovie = async () => {
		// Fetch all Netflix Originals
		const request = await axios.get(requests.fetchTopRated);
		// Generate a random page number
		const randomPage = Math.floor(Math.random() * request.data.total_pages);
		// Fetch all movies from random page
		const request2 = await axios.get(
			requests.fetchTopRated + '&page=' + randomPage
		);
		// Generate a random index
		const randomIndex = Math.floor(
			Math.random() * request2.data.results.length
		);
		// Select and set a movie from the random index
		setMovie(request2.data.results[randomIndex]);
	};

	useEffect(() => {
		getRandomMovie();
	}, []);

	return (
		<header
			className="banner"
			style={{ backgroundImage: `url(${base_url}${movie?.backdrop_path})` }}
		>
			<div className="banner__content">
				<h1 className="banner__title">
					{movie?.name || movie?.title || movie?.original_name}
				</h1>
				<div className="banner__buttons">
					<button
						onClick={setMovieDetails}
						className="banner__button banner__button-play"
					>
						Play
					</button>
					<button
						onClick={setMovieDetails}
						className="banner__button banner__button-info"
					>
						More info
					</button>
				</div>
				<h1 className="banner__description">
					{truncate(movie?.overview, 150)}
				</h1>
			</div>
		</header>
	);
};

export default Banner;
