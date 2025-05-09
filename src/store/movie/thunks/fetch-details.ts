import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../index";
import type { DetailsMovie } from "../../../ts/shared/types";
import Cookies from "js-cookie";

export const fetchDetailsMovie = createAsyncThunk<DetailsMovie, string, { state: RootState }>(
  "movie/fetchDetailsMovie ",
  async (movieId, { rejectWithValue }) => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      };
      const request = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=ru-RU`,
        options,
      );
      if (!request.ok) throw new Error(`Ошибка запроса ${request.status}`);
      const data = await request.json();
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);
