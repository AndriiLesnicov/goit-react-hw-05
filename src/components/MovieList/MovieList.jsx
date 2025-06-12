import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(({ id, title, poster_path }) => {
        const posterUrl = poster_path
          ? `https://image.tmdb.org/t/p/w500${poster_path}`
          : "https://via.placeholder.com/500x750?text=No+Image";

        return (
          <li className={css.item} key={id}>
            <Link
              to={`/movies/${id}`}
              state={{ from: location }}
              className={css.link}
            >
              <img
                src={posterUrl}
                alt={title}
                className={css.poster}
                loading="lazy"
              />
              <p className={css.title}>{title}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
