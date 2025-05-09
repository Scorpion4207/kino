import { type ActionReducerMapBuilder, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CreditsMovie, DetailsMovie, MovieLists } from "../../ts/shared/types";
import { initialState } from "./initial-state";
import { fetchMovieList } from "./thunks/fetch-movie-list";
import { fetchCredits } from "./thunks/fetch-credits";
import { fetchDetailsMovie } from "./thunks/fetch-details";
import {
  FETCH_MOVIE_DETAILS_CREDITS_FAILED,
  FETCH_MOVIE_DETAILS_CREDITS_SUCCEEDED,
} from "./middleware/movie-details-credits-middleware";
import { fetchFavorite } from "./thunks/fetch-favorite";
import { fetchSearchMovie } from "./thunks/fetch-search-movie";
import { fetchMovies } from "./thunks/fetch-movie";

export interface MovieState {
  movieList: MovieLists[];
  favoriteMovie: MovieLists["id"][];
  movieDetails: DetailsMovie | null;
  movieCasts: CreditsMovie[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    toggleFavoriteMovie: (state, action: PayloadAction<MovieLists["id"]>) => {
      if (!state.favoriteMovie) return;
      const isFavoriteMovieId = state.favoriteMovie.includes(action.payload);
      if (isFavoriteMovieId) {
        state.favoriteMovie = state.favoriteMovie.filter((id) => id !== action.payload);
      } else {
        state.favoriteMovie = [...state.favoriteMovie, action.payload];
      }
    },
    setDetailsCreditsLoading: (state, action: PayloadAction<MovieState["loading"]>) => {
      state.movieCasts = [];
      state.movieDetails = null;
      state.loading = action.payload;
      state.error = null;
    },
    setDetailsCreditsIdle: (state) => {
      state.loading = "idle";
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<MovieState>) => {
    builder.addCase(fetchMovieList.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(fetchMovieList.fulfilled, (state, action) => {
      state.movieList = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(fetchMovieList.rejected, (state) => {
      state.loading = "failed";
      state.error = "Не удалось загрузить список фильмов";
    });
    builder.addCase(fetchMovies.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movieList = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(fetchMovies.rejected, (state) => {
      state.loading = "failed";
      state.error = "Не удалось загрузить список фильмов";
    });
    builder.addCase(fetchCredits.fulfilled, (state, action) => {
      state.movieCasts = action.payload;
    });
    builder.addCase(fetchFavorite.fulfilled, (state, action) => {
      state.favoriteMovie = action.payload;
    });
    builder.addCase(fetchSearchMovie.fulfilled, (state, action) => {
      state.movieList = action.payload;
    });
    builder.addCase(fetchDetailsMovie.fulfilled, (state, action) => {
      state.movieDetails = action.payload;
    });
    builder.addCase(FETCH_MOVIE_DETAILS_CREDITS_SUCCEEDED, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(FETCH_MOVIE_DETAILS_CREDITS_FAILED, (state) => {
      state.loading = "failed";
      state.error = "Произошла непредвиденная ошибка при загрузке данных";
    });
  },
});

export const { toggleFavoriteMovie, setDetailsCreditsLoading, setDetailsCreditsIdle } =
  movieSlice.actions;

export default movieSlice.reducer;
