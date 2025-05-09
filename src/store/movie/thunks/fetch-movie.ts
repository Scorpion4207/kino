import { createAsyncThunk } from "@reduxjs/toolkit";
import type { MovieLists } from "../../../ts/shared/types";
import type { RootState } from "../../index";
import { MAX_YEAR, MIN_YEAR } from "../../../ts/data/data-selects";
import Cookies from "js-cookie";
import { updateTotalPages } from "../../filters/slice";

export const fetchMovies = createAsyncThunk<MovieLists[], void, { state: RootState }>(
  "movie/fetchMovies",
  async (_, { getState, rejectWithValue, dispatch }) => {
    const {
      page: { selectPage },
      selectedYears,
      selectedGenresNames,
    } = getState().filters;
    const years = !selectedYears ? [MIN_YEAR, MAX_YEAR] : selectedYears;
    const newArrayMovies: MovieLists[] = [];
    const idsGenres = selectedGenresNames.map((genre) => genre.id);
    let totalPages;
    if (!Array.isArray(years)) {
      return rejectWithValue("Произошла ошибка");
    }
    for (let year: number = years[0]; year <= years[1]; year++) {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        };

        const request = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ru&page=${selectPage}&primary_release_year=${year}&sort_by=popularity.desc${idsGenres.length === 0 ? "" : `&with_genres=${idsGenres.join("%2C")}`}`,
          options,
        );
        if (!request.ok) throw new Error("Произошла ошибка");
        const data = await request.json();
        const results = await data.results;
        totalPages = data.total_pages;
        newArrayMovies.push(...results);
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
    dispatch(updateTotalPages(totalPages));
    return newArrayMovies;
  },
);
