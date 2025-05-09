import { useEffect } from "react";
import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CircularProgress from "@mui/material/CircularProgress";
import type { Genre } from "../../../ts/shared/types";
import { fetchGenres } from "../../../store/filters/thunks/fetch-genres";
import { useFilterSelectors } from "../../../hooks/filters/use-selectors";
import { useAppDispatch } from "../../../hooks/hooks";
import { setSelectedGenres } from "../../../store/filters/slice";

export const Genres = () => {
  const { genres, selectGenresNames, statusLoading, error } = useFilterSelectors();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const handleToggle = (_: React.SyntheticEvent<Element, Event>, toggleGenre: Genre[]) => {
    dispatch(setSelectedGenres(toggleGenre));
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  if (statusLoading === "pending") {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Autocomplete
        multiple
        options={genres}
        value={selectGenresNames}
        onChange={handleToggle}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.name}
            </li>
          );
        }}
        style={{ width: 350 }}
        renderInput={(params) => <TextField {...params} label="Жанры" />}
      />
      {statusLoading === "failed" && <p>{error}</p>}
    </>
  );
};
