import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
        {
          params: { api_key: "e1d0de03ad7280ec25f73bd35a1bd045" },
        }
      );
      setReviews(response.data.results);
    }

    fetchReviews();
  }, [movieId]);

  return (
    <ul>
      {reviews.length > 0 ? (
        reviews.map(({ id, author, content }) => (
          <li key={id}>
            <strong>{author}</strong>: {content}
          </li>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </ul>
  );
}
