import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { popularityData } from "../../../ts/data/data-selects";
import { useFilterSelectors } from "../../../hooks/filters/use-selectors";
import { useAppDispatch } from "../../../hooks/hooks";
import { setPopularity } from "../../../store/filters/slice";

export interface SortingValue {
  id: number;
  value: string;
}

export const Sorting = () => {
  const { selectPopularity } = useFilterSelectors();
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setPopularity(event.target.value));
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Сортировка по:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectPopularity}
          label="Сортировать по:"
          onChange={handleChange}
        >
          {popularityData.map((select) => (
            <MenuItem key={select.id} value={select.value}>
              {select.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
