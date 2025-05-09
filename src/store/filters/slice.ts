import { createSlice, type PayloadAction, type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { Genre, Page } from "../../ts/shared/types";
import { initialState } from "./initial-state";
import { fetchGenres } from "./thunks/fetch-genres";

export interface FiltersState {
  searchQueryNameMovie: string;
  selectedPopularity: string;
  selectedYears: number | number[] | null;
  selectedGenresNames: Genre[];
  genres: Genre[];
  page: Page;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQueryNameMovie = action.payload;
      if (state.searchQueryNameMovie !== "" || state.searchQueryNameMovie.length)
        state.page.selectPage = "1";
    },
    setPopularity(state, action: PayloadAction<string>) {
      state.selectedPopularity = action.payload;
      state.page.selectPage = "1";
    },
    setPage(state, action: PayloadAction<string>) {
      state.page.selectPage = action.payload;
    },
    updateTotalPages(state, action: PayloadAction<number>) {
      state.page.totalPages = action.payload;
    },
    setYears(state, action: PayloadAction<number | number[]>) {
      state.selectedYears = action.payload;
      state.page.selectPage = "1";
    },
    setSelectedGenres(state, action: PayloadAction<Genre[]>) {
      state.selectedGenresNames = action.payload;
      state.page.selectPage = "1";
    },
    resetFilters(state) {
      return {
        ...state,
        selectedPopularity: "popular",
        selectedYears: null,
        selectedGenresNames: [],
      };
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<FiltersState>) => {
    builder.addCase(fetchGenres.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(fetchGenres.rejected, (state) => {
      state.loading = "failed";
      state.error = "Произошла ошибка при загрузке жанров";
    });
  },
});

export const {
  setSearchQuery,
  setPopularity,
  resetFilters,
  setSelectedGenres,
  setPage,
  setYears,
  updateTotalPages,
} = filtersSlice.actions;

export default filtersSlice.reducer;
