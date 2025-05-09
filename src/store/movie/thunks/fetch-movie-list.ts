import { createAsyncThunk } from "@reduxjs/toolkit";
import type { MovieLists } from "../../../ts/shared/types";
import type { RootState } from "../../index";
import { updateTotalPages } from "../../filters/slice";
import Cookies from "js-cookie";

interface MovieListParams {
  selectPageSelectPage: string;
  selectPopularity: string;
}

export const fetchMovieList = createAsyncThunk<MovieLists[], MovieListParams, { state: RootState }>(
  "movie/fetchMovieList",
  async ({ selectPageSelectPage, selectPopularity }, { rejectWithValue, dispatch }) => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      };
      const request = await fetch(
        `https://api.themoviedb.org/3/movie/${selectPopularity}?language=ru&page=${selectPageSelectPage}`,
        options,
      );
      if (!request.ok) throw new Error(`Ошибка запроса ${request.status}`);
      const data = await request.json();
      dispatch(updateTotalPages(data.total_pages));
      const results = await data.results;
      return results;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);
