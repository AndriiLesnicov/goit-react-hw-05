import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = location.state?.from || "/movies";
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          params: { api_key: "YOUR_API_KEY" },
        }
      );
      setMovie(response.data);
    }

    fetchMovie();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <main>
      <Link to={backLink}>Go back</Link>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <ul>
        <li>
          <Link to="cast" state={{ from: backLink }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: backLink }}>
            Reviews
          </Link>
        </li>
      </ul>

      <Suspense fallback={<p>Loading subpage...</p>}>
        <Outlet />
      </Suspense>
    </main>
  );
}
