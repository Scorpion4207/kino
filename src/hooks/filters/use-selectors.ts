import { useAppSelector } from "../hooks";

export const useFilterSelectors = () => {
  const selectSearchQueryNameMovie = useAppSelector((state) => state.filters.searchQueryNameMovie);
  const selectPopularity = useAppSelector((state) => state.filters.selectedPopularity);
  const selectYears = useAppSelector((state) => state.filters.selectedYears);
  const selectGenresNames = useAppSelector((state) => state.filters.selectedGenresNames);
  const genres = useAppSelector((state) => state.filters.genres);
  const selectPageSelectPage = useAppSelector((state) => state.filters.page.selectPage);
  const selectPageTotalPages = useAppSelector((state) => state.filters.page.totalPages);
  const statusLoading = useAppSelector((state) => state.filters.loading);
  const error = useAppSelector((state) => state.filters.error);

  return {
    selectSearchQueryNameMovie,
    selectPopularity,
    selectYears,
    genres,
    selectGenresNames,
    selectPageSelectPage,
    selectPageTotalPages,
    statusLoading,
    error,
  };
};
