import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import Movie from "./Movie";

// 736985db
const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=736985db";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setsearch] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("all");
  }, []);

  return (
    <div className="app">
      <h1>Movie</h1>
      <div className="search">
        <input
          type="text"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              searchMovies(search);
            }
          }}
          placeholder="Search Movies 🎥"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(search)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <Movie key={movie.Title} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>OOPS, No Movies Found...🥴</h2>
        </div>
      )}
      <span>
        <h3>Created By CS</h3>
      </span>
    </div>
  );
};

export default App;
