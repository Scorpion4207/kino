import type { Action, Middleware } from "redux";
import type { AppDispatch, RootState } from "../../index";
import { setDetailsCreditsLoading } from "../slice";
import { fetchDetailsMovie } from "../thunks/fetch-details";
import { fetchCredits } from "../thunks/fetch-credits";
import { fetchFavorite } from "../thunks/fetch-favorite";

export const FETCH_MOVIE_DETAILS_CREDITS = "movie/fetchMovieDetailsCredits";
export const FETCH_MOVIE_DETAILS_CREDITS_SUCCEEDED = "movie/fetchMovieDetailsCreditsSucceeded";
export const FETCH_MOVIE_DETAILS_CREDITS_FAILED = "movie/fetchMovieDetailsCreditsFailed";

interface FetchMovieDetailsCreditsPayload {
  movieId: string;
}

interface FetchMovieDetailsCreditsAction extends Action<typeof FETCH_MOVIE_DETAILS_CREDITS> {
  payload: FetchMovieDetailsCreditsPayload;
}

export const fetchMovieDetailsCreditsAction = (payload: FetchMovieDetailsCreditsPayload) => ({
  type: FETCH_MOVIE_DETAILS_CREDITS,
  payload,
});

export const movieDetailsCreditsMiddleware: Middleware<{}, RootState, AppDispatch> =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);

    if (
      action &&
      typeof action === "object" &&
      (action as Action).type === FETCH_MOVIE_DETAILS_CREDITS
    ) {
      const { movieId } = (action as FetchMovieDetailsCreditsAction).payload;
      dispatch(setDetailsCreditsLoading("pending"));
      try {
        const result = await Promise.allSettled([
          dispatch(fetchDetailsMovie(movieId)),
          dispatch(fetchCredits(movieId)),
          dispatch(fetchFavorite()),
        ]);

        const allFulfilled = result.every((res) => res.status === "fulfilled");
        if (allFulfilled) {
          dispatch({ type: FETCH_MOVIE_DETAILS_CREDITS_SUCCEEDED });
        } else {
          throw new Error("Произошла непредвиденная ошибка при загрузке данных");
        }
      } catch (error) {
        dispatch({ type: FETCH_MOVIE_DETAILS_CREDITS_FAILED });
        return error;
      }
    }
  };
