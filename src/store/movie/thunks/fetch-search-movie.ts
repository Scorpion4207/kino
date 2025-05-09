import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../index";
import type { MovieLists } from "../../../ts/shared/types";
import { updateTotalPages } from "../../filters/slice";
import Cookies from "js-cookie";

export const fetchSearchMovie = createAsyncThunk<MovieLists[], string, { state: RootState }>(
  "movie/fetchSearchMovie",
  async (inputValue, { rejectWithValue, getState, dispatch }) => {
    const state = getState();
    const {
      page: { selectPage },
    } = state.filters;
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      };
      const request = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${inputValue}&include_adult=false&language=ru&page=${selectPage}`,
        options,
      );
      if (!request.ok) throw new Error(`Ошибка запроса ${request.status}`);
      const data = await request.json();
      const results = await data.results;
      dispatch(updateTotalPages(data.total_pages));
      return results;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
