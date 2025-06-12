import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchTrending() {
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/day",
        {
          params: {
            api_key: "e1d0de03ad7280ec25f73bd35a1bd045",
          },
        }
      );
      setMovies(response.data.results);
    }

    fetchTrending();
  }, []);

  return (
    <main>
      <h1>Trending Today</h1>
      <MovieList movies={movies} />
    </main>
  );
}
