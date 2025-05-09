import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { setSearchQuery } from "../../../store/filters/slice";
import { useFilterSelectors } from "../../../hooks/filters/use-selectors";
import { useAppDispatch } from "../../../hooks/hooks";

export const SearchMovie = () => {
  const { selectSearchQueryNameMovie, selectPageTotalPages } = useFilterSelectors();

  const [inputValue, setInputValue] = useState(selectSearchQueryNameMovie);
  const dispatch = useAppDispatch();

  const handleChangeMovieName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };
  useEffect(() => {
    const searchQueryValue = setTimeout(() => {
      dispatch(setSearchQuery(inputValue));
    }, 500);
    return () => {
      clearTimeout(searchQueryValue);
    };
  }, [inputValue, selectPageTotalPages]);

  return (
    <TextField
      sx={{ width: "100%", marginBottom: "20px" }}
      value={inputValue}
      onChange={handleChangeMovieName}
      label="Название фильма"
      variant="outlined"
    />
  );
};
