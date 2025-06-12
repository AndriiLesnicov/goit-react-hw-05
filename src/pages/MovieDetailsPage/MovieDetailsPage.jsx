import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useState, Suspense, useRef } from "react";
import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWQwZGUwM2FkNzI4MGVjMjVmNzNiZDM1YTFiZDA0NSIsIm5iZiI6MTc0OTc1ODg1My44NDksInN1YiI6IjY4NGIzMzg1NGNmZjMyMjRiYzFlYmE2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e-jkIbubiYiE32ZmrTkQTkxFk3-FgVMQWzImlYmxXAU";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/movies");
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
            params: {
              language: "en-US",
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      }
    }

    fetchMovie();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <main>
      <Link to={backLinkRef.current}>Go back</Link>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <img
          src={posterUrl}
          alt={movie.title}
          width={300}
          style={{ borderRadius: "10px", objectFit: "cover" }}
        />
        <div>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>

          <ul>
            <li>
              <Link to="cast" state={{ from: backLinkRef.current }}>
                Cast
              </Link>
            </li>
            <li>
              <Link to="reviews" state={{ from: backLinkRef.current }}>
                Reviews
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <Suspense fallback={<p>Loading subpage...</p>}>
        <Outlet />
      </Suspense>
    </main>
  );
}
