import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { IoChevronBack } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/movie_list.css";
import MovieDetails from "./MovieDetails";

const API_KEY = "da75cdfdd3702cbf418206d53e499f71";
const BASE_URL = "https://api.themoviedb.org/3/";

const MovieList = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("Popular");
    const [selectedMovie, setSelectedMovie] = useState(null); // Stores the selected movie
    const [genres, setGenres] = useState({});

    // Function to fetch movies based on active tab or search query
    const fetchMovies = useCallback(async () => {
        setLoading(true);
        setError(null);
        let url = "";

        if (searchQuery.trim().length > 2) {
            url = `${BASE_URL}search/movie?query=${searchQuery}&api_key=${API_KEY}`;
        } else {
            if (activeTab === "Popular") {
                url = `${BASE_URL}movie/popular?api_key=${API_KEY}`;
            } else if (activeTab === "Trending") {
                url = `${BASE_URL}trending/movie/week?api_key=${API_KEY}`;
            } else if (activeTab === "All") {
                url = `${BASE_URL}movie/top_rated?api_key=${API_KEY}`;
            }
        }

        if (!url) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(url);
            setMovies(response.data.results || []);
        } catch (err) {
            setError("Error fetching movies!");
            setMovies([]);
        }
        setLoading(false);
    }, [activeTab, searchQuery]);

    // Fetch movies when tab or search query changes
    useEffect(() => {
        fetchGenres();
        fetchMovies();
    }, [fetchMovies]);

    // Show details for selected movie
    const handleShowDetails = (movie) => {
        setSelectedMovie(movie);
    };

    // Close details popup
    const handleCloseDetails = () => {
        setSelectedMovie(null);
    };
    const fetchGenres = async () => {
        try {
            const response = await axios.get(`${BASE_URL}genre/movie/list?api_key=${API_KEY}`);
            const genreMap = {};
            response.data.genres.forEach((genre) => {
                genreMap[genre.id] = genre.name; // Convert to {28: "Action", 12: "Adventure"}
            });
            setGenres(genreMap);
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    };

    return (
        <>
            {/* Header with Back button, Title, and Search Box */}
            <div className="header">
                <div className="bckbtn">
                    <button className="back_btn" onClick={() => navigate("/cards")}>
                        <IoChevronBack className="back-icon" />Back
                    </button>
                </div>

                <h1>Movies Search App</h1>
                <div className="search-box">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search Here..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Tabs below the header */}
            <div className="tabs">
                {["Popular", "All", "Trending"].map((tab) => (
                    <button
                        key={tab}
                        className={activeTab === tab ? "active" : ""}
                        onClick={() => {
                            setActiveTab(tab);
                            setSearchQuery("");
                        }}
                    >
                        {tab} Movies
                    </button>
                ))}
            </div>

            {/* Movies Grid */}
            <div className="movies-grid">
                {loading ? (
                    <p>Loading movies...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : movies.length === 0 ? (
                    <p>No movies found</p>
                ) : (
                    movies.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <img
                                src={movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : "https://via.placeholder.com/270x350"}
                                alt={movie.title}
                                className="movie-poster"
                            />
                            <div className="movie-info">
                                <h3>

                                    {movie.title.length > 15 ? (
                                        <span className="tooltip-container">
                                            <span className="movie-name">
                                                {movie.title.substring(0, 15) + "..."}
                                            </span>
                                            <span className="tooltip-text">{movie.title}</span>
                                        </span>
                                    ) : (
                                        <span className="movie-name">{movie.title}</span>
                                    )}
                                    <FaInfoCircle className="info-icon" onClick={() => handleShowDetails(movie)} />
                                </h3>


                                <div className="year_star_container">
                                    <p>{movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</p>

                                    {/* Star Rating (rounded to nearest whole number) */}
                                    <div className="movie-rating">
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <span key={index} className={index < Math.round(movie.vote_average / 2) ? "star filled" : "star"}>
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Watch Button */}
                                <button className="watch-button">Watch</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* MovieDetails Modal */}
            {selectedMovie && <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />}
        </>
    );
};

export default MovieList;
