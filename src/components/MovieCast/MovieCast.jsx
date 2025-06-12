import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function fetchCast() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits`,
        {
          params: { api_key: "e1d0de03ad7280ec25f73bd35a1bd045" },
        }
      );
      setCast(response.data.cast);
    }

    fetchCast();
  }, [movieId]);

  return (
    <ul>
      {cast.map(({ id, name, character }) => (
        <li key={id}>
          {name} as {character}
        </li>
      ))}
    </ul>
  );
}
