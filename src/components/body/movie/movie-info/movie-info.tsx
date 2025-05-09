import { Box, CardMedia, Stack } from "@mui/material";
import { useEffect } from "react";
import { MovieDetails } from "./movie-details";
import { MovieCasts } from "./movie-cast";
import { useParams } from "react-router";
import { useAppDispatch } from "../../../../hooks/hooks";
import { fetchMovieDetailsCreditsAction } from "../../../../store/movie/middleware/movie-details-credits-middleware";
import { useMovieSelectors } from "../../../../hooks/movie/use-selector";
import { CircularProgress } from "@mui/material";

export const MovieInfo = () => {
  const { idMovie } = useParams<{ idMovie: string }>();
  if (!idMovie) return;
  const dispatch = useAppDispatch();
  const { selectMovieDetails, statusMovieCasts, selectFavoriteMovie, statusMovieLoading } =
    useMovieSelectors();

  useEffect(() => {
    dispatch(fetchMovieDetailsCreditsAction({ movieId: idMovie }));
  }, [dispatch, idMovie]);

  if (statusMovieLoading === "pending" || statusMovieLoading === "idle") {
    return (
      <Stack sx={{ alignItems: "center", justifyContent: "center", height: "85vh" }}>
        <CircularProgress />;
      </Stack>
    );
  }
  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "15px",
          padding: " 5px 25px",
        }}
      >
        <CardMedia
          height="500"
          width="333"
          component="img"
          image={`https://image.tmdb.org/t/p/w500${selectMovieDetails?.poster_path}`}
          alt="movie poster"
        />

        <Box sx={{ flexShrink: 0 }}>
          <MovieDetails
            detail={selectMovieDetails!}
            favoriteValue={selectFavoriteMovie.includes(+idMovie!) ? true : false}
            idMovie={+idMovie!}
          />
        </Box>
      </Box>
      <MovieCasts casts={statusMovieCasts} />
    </Box>
  );
};
