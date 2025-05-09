import { useAppSelector } from "../hooks";

export const useMovieSelectors = () => {
  const selectMovieList = useAppSelector((state) => state.movie.movieList);
  const selectFavoriteMovie = useAppSelector((state) => state.movie.favoriteMovie);
  const selectMovieDetails = useAppSelector((state) => state.movie.movieDetails);
  const statusMovieCasts = useAppSelector((state) => state.movie.movieCasts);
  const statusMovieLoading = useAppSelector((state) => state.movie.loading);
  const movieError = useAppSelector((state) => state.movie.error);

  return {
    selectMovieList,
    selectFavoriteMovie,
    selectMovieDetails,
    statusMovieCasts,
    statusMovieLoading,
    movieError,
  };
};
