import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/moviedetails.css";

const API_KEY = "da75cdfdd3702cbf418206d53e499f71";
const BASE_URL = "https://api.themoviedb.org/3/movie/";

const MovieDetails = ({ movie, onClose }) => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${movie.id}?api_key=${API_KEY}`);
                console.log("Full Movie Details API Response:", response.data);
                setMovieDetails(response.data);
            } catch (err) {
                console.error("Error fetching movie details:", err);
                setError("Failed to fetch movie details.");
            }
            setLoading(false);
        };

        fetchMovieDetails();
    }, [movie.id]);

    if (loading) return <p>Loading movie details...</p>;
    if (error) return <p>{error}</p>;
    if (!movieDetails) return null; // Prevent rendering errors

    const languageMap = {
        en: "English",
        fr: "French",
        es: "Spanish",
        de: "German",
        it: "Italian",
        ja: "Japanese",
        ko: "Korean",
        hi: "Hindi",
        zh: "Chinese",
        ru: "Russian",
    };

    return (
        <div className="overlay">
            <div className="movie-details">
                <button className="close-btn" onClick={onClose}>X</button>
                <h2>{movieDetails.title}</h2>
                <hr />

                <div className="genre-buttons">
                    {movieDetails.genres && movieDetails.genres.length > 0 ? (
                        movieDetails.genres.map((genre) => (
                            <button key={genre.id} className="genre-btn">
                                {genre.name}
                            </button>
                        ))
                    ) : (
                        <span>N/A</span>
                    )}
                </div>

                <p className="overview"><strong>Overview:</strong> {movieDetails.overview || "No description available."}</p>
                <p className="language"><strong>Language:</strong> {languageMap[movieDetails.original_language] || "Unknown"}</p>




                <p className="production"><strong>Production Companies:</strong>
                    {movieDetails.production_companies.length > 0
                        ? movieDetails.production_companies.map((company) => company.name).join(", ")
                        : "N/A"}
                </p>
            </div>
        </div>
    );
};

export default MovieDetails;
