import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../index";
import type { MovieLists } from "../../../ts/shared/types";
import Cookies from "js-cookie";

export const fetchFavorite = createAsyncThunk<MovieLists["id"][], void, { state: RootState }>(
  "user/fetchFavorite",
  async (_, { rejectWithValue }) => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      };
      const request = await fetch(
        `https://api.themoviedb.org/3/account/${Cookies.get("idAccount")}/favorite/movies`,
        options,
      );
      if (!request.ok) throw new Error(`Ошибка запроса ${request.status}`);
      const data = await request.json();
      const moviesFavorite = await data.results;
      const idsMoviesFavorite = await moviesFavorite.map((movie: MovieLists) => movie.id);
      return idsMoviesFavorite;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);
