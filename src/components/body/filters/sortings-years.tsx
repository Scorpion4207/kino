import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useFilterSelectors } from "../../../hooks/filters/use-selectors";
import { MAX_YEAR, MIN_YEAR } from "../../../ts/data/data-selects";
import { useAppDispatch } from "../../../hooks/hooks";
import { setYears } from "../../../store/filters/slice";

export const SortingYears = () => {
  const { selectYears } = useFilterSelectors();
  const dispatch = useAppDispatch();

  const handleChange = (_: Event, newValue: number | number[]) => {
    dispatch(setYears(newValue));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        getAriaLabel={() => "release year"}
        value={!selectYears ? [MAX_YEAR, MIN_YEAR] : selectYears}
        onChange={handleChange}
        valueLabelDisplay="auto"
        step={5}
        marks
        min={1990}
        max={2025}
      />
    </Box>
  );
};
