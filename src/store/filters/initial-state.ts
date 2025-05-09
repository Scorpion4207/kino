import type { FiltersState } from "./slice";

export const initialState: FiltersState = {
  searchQueryNameMovie: "",
  selectedPopularity: "popular",
  selectedYears: null,
  selectedGenresNames: [],
  genres: [],
  page: {
    selectPage: "1",
    totalPages: null,
  },
  loading: "idle",
  error: null,
};
