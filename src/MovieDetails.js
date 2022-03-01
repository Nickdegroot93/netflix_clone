import React, { useEffect, useState } from 'react';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';
import { IoArrowBackCircleOutline, IoWarningOutline } from 'react-icons/io5';
import { useMediaQuery } from 'react-responsive';

import axios from './axios';
import requests from './requests';
import './MovieDetails.css';

const base_url = 'https://image.tmdb.org/t/p/original';

const MovieDetails = ({ movie, closeMovie }) => {
	const [movieInfo, setMovieInfo] = useState(null);
	const [trailerUrl, setTrailerUrl] = useState(null);
	const [error, setError] = useState(false);
	const [genres, setGenres] = useState([]);

	const isMobile = useMediaQuery({ query: '(max-width: 690px)' });

	const getYoutubeUrl = async () => {
		try {
			const youtubeUrl = await movieTrailer(
				movie?.title || movie?.name || movie?.original_name
			);
			if (!youtubeUrl) setError(true);
			setTrailerUrl(youtubeUrl);
		} catch (error) {
			console.log(error);
		}
	};

	const getYoutubeID = (url) => {
		const regExp =
			/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		return match && match[2].length === 11 ? match[2] : false;
	};

	const getGenres = async () => {
		const request = await axios.get(requests.fetchGenres);
		movie.genre_ids.forEach((id) => {
			const genre = request.data.genres.find((genre) => genre.id === id);
			genres.push(genre.name);
		});
	};

	useEffect(() => {
		setMovieInfo(movie);
		getYoutubeUrl();
		getGenres();
	}, [movie]);

	console.log(movieInfo);
	console.log(genres);

	// Round off the votes
	function voteFormar(value) {
		// Nine Zeroes for Billions
		return Math.abs(Number(value)) >= 1.0e9
			? Math.abs(Number(value)) / 1.0e9 + 'B'
			: // Six Zeroes for Millions
			Math.abs(Number(value)) >= 1.0e6
			? (Math.abs(Number(value)) / 1.0e6).toFixed(1) + 'M'
			: // Three Zeroes for Thousands
			Math.abs(Number(value)) >= 1.0e3
			? (Math.abs(Number(value)) / 1.0e3).toFixed(1) + 'K'
			: Math.abs(Number(value));
	}

	return (
		<div className="movie">
			<div
				className="movie__banner"
				style={{ backgroundImage: `url(${base_url}${movie?.backdrop_path})` }}
			>
				<IoArrowBackCircleOutline
					onClick={closeMovie}
					className="movie__back-icon"
				/>
				<div className="movie__trailer">
					{!trailerUrl && !error && (
						<h1 className="movie__loading">Loading trailer...</h1>
					)}
					{error && (
						<h1 className="movie__error">
							<div>
								<IoWarningOutline />
								Error
							</div>
							<span>Could not find trailer</span>
						</h1>
					)}
					{trailerUrl && (
						<YouTube
							videoId={getYoutubeID(trailerUrl)}
							opts={{
								height: isMobile ? '260' : '390',
								width: isMobile ? '427' : '640',
								playerVars: {
									autoplay: 1,
								},
							}}
						/>
					)}
				</div>
			</div>
			<div className="movie__content">
				<div className="movie__info">
					<div className="movie__info-secondary">
						<div className="movie__rating">
							{movie?.vote_average}
							<span>/10 · {voteFormar(movie?.vote_count)} votes</span>
						</div>

						<div className="movie__genres">
							{genres.map((genre) => (
								<span className="movie__genre" key={genre}>
									{genre}
								</span>
							))}
						</div>
					</div>
					<div className="movie__info-primary">
						<h1 className="movie__title">
							{movie?.name || movie?.title || movie?.original_name}

							<span className="movie__year">
								(
								{(movie?.release_date || movie?.first_air_date).substring(0, 4)}
								)
							</span>
						</h1>
						<p className="movie__description">{movie?.overview}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieDetails;
