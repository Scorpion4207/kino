import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useFilterSelectors } from "../../../hooks/filters/use-selectors";
import { CircularProgress } from "@mui/material";
import { useAppDispatch } from "../../../hooks/hooks";
import { setPage } from "../../../store/filters/slice";

export const PaginationControlled = () => {
  const { selectPageSelectPage, selectPageTotalPages } = useFilterSelectors();
  const dispatch = useAppDispatch();

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value.toString()));
  };

  if (!selectPageTotalPages) {
    return (
      <Stack spacing={1} sx={{ justifyContent: "center" }}>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Stack spacing={1}>
      <Pagination
        variant="outlined"
        page={+selectPageSelectPage}
        count={Math.min(selectPageTotalPages, 500)}
        onChange={handleChange}
      />
    </Stack>
  );
};
