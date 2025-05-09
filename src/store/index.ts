import { type AnyAction, configureStore, type ThunkDispatch } from "@reduxjs/toolkit";
import filtersReducer from "./filters/slice";
import userReducer from "./user/slice";
import movieReducer from "./movie/slice";
import { movieDetailsCreditsMiddleware } from "./movie/middleware/movie-details-credits-middleware";
import { fetchAuthAccountMiddleware } from "./user/middleware/auth-account-middleware";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    userData: userReducer,
    movie: movieReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieDetailsCreditsMiddleware, fetchAuthAccountMiddleware),
});

export type RootState = {
  filters: ReturnType<typeof filtersReducer>;
  userData: ReturnType<typeof userReducer>;
  movie: ReturnType<typeof movieReducer>;
};

export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;
