import type { MovieState } from "./slice";

export const initialState: MovieState = {
  movieList: [],
  favoriteMovie: [],
  movieDetails: null,
  movieCasts: [],
  loading: "idle",
  error: null,
};
