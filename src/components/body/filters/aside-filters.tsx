import { Box, IconButton } from "@mui/material";
import { Genres } from "./genres";
import CloseIcon from "@mui/icons-material/Close";
import { Sorting } from "./sorting-popularity";
import { SortingYears } from "./sortings-years";
import { PaginationControlled } from "./pagination";
import { SearchMovie } from "./search-name";
import { resetFilters } from "../../../store/filters/slice";
import { useAppDispatch } from "../../../hooks/hooks";

export const AsideFilters = () => {
  const dispatch = useAppDispatch();
  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <aside className="aside">
      <Box
        sx={{
          height: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 24px",
          borderRadius: "20px",
          border: "2px solid #1E90FF",
        }}
      >
        <div className="aside__top">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h3 className="aside__title">Фильтры</h3>
            <IconButton onClick={handleReset}>
              <CloseIcon />
            </IconButton>
          </Box>
          <div className="aside__sorting">
            <SearchMovie />
            <Sorting />
            <h4 className="aside__title">Год релиза</h4>
            <SortingYears />
          </div>
          <Genres />
        </div>
        <div className="aside__bottom">
          <PaginationControlled />
        </div>
      </Box>
    </aside>
  );
};
