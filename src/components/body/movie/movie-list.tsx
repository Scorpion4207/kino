import { useEffect } from "react";
import { MovieСard } from "./movie-card";
import original from "../../../assets/original.jpeg";
import { useAppDispatch } from "../../../hooks/hooks";
import { useMovieSelectors } from "../../../hooks/movie/use-selector";
import { fetchFavorite } from "../../../store/movie/thunks/fetch-favorite";
import { fetchMovieList } from "../../../store/movie/thunks/fetch-movie-list";
import { CircularProgress } from "@mui/material";
import { useFilterSelectors } from "../../../hooks/filters/use-selectors";
import { fetchSearchMovie } from "../../../store/movie/thunks/fetch-search-movie";
import { fetchMovies } from "../../../store/movie/thunks/fetch-movie";

export const MovieList = () => {
  const dispatch = useAppDispatch();
  const { selectMovieList, selectFavoriteMovie, statusMovieLoading } = useMovieSelectors();
  const {
    selectPopularity,
    selectPageSelectPage,
    selectSearchQueryNameMovie,
    selectGenresNames,
    selectYears,
  } = useFilterSelectors();

  useEffect(() => {
    dispatch(fetchFavorite());
    if (selectSearchQueryNameMovie !== "") {
      dispatch(fetchSearchMovie(selectSearchQueryNameMovie));
      return;
    }
    if (selectGenresNames.length !== 0 || selectYears) {
      dispatch(fetchMovies());
      return;
    }
    dispatch(fetchMovieList({ selectPopularity, selectPageSelectPage }));
  }, [
    dispatch,
    selectPageSelectPage,
    selectPopularity,
    selectSearchQueryNameMovie.length,
    selectYears,
    selectGenresNames.length,
  ]);

  if (statusMovieLoading === "pending" || selectFavoriteMovie.length === 0) {
    return <CircularProgress />;
  }
  return (
    <>
      {selectMovieList.map((card) => (
        <MovieСard
          key={card.id}
          favoriteValue={selectFavoriteMovie.includes(card.id) ? true : false}
          idMovie={card.id.toString()}
          cardMovie={
            !card.poster_path ? original : `https://image.tmdb.org/t/p/w500${card.poster_path}`
          }
          title={card.title}
          average={card.vote_average}
        />
      ))}
    </>
  );
};
