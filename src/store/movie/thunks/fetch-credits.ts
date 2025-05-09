import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../index";
import type { CreditsMovie } from "../../../ts/shared/types";
import Cookies from "js-cookie";

export const fetchCredits = createAsyncThunk<CreditsMovie[], string, { state: RootState }>(
  "movie/fetchCredits",
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
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ru`,
        options,
      );
      if (!request.ok) throw new Error(`Ошибка запроса ${request.status}`);
      const data = await request.json();
      const castsData = await data.cast;
      return castsData;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);
