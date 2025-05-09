import { IconButton, Stack, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import type { DetailsMovie } from "../../../../ts/shared/types";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router";
import { Star, StarBorder } from "@mui/icons-material";
import { useAppDispatch } from "../../../../hooks/hooks";
import { fetchPostFavorite } from "../../../../store/movie/thunks/fetch-post-favorite";

interface MovieDetailsProps {
  detail: DetailsMovie;
  favoriteValue: boolean;
  idMovie: number;
}

export const MovieDetails = ({ detail, favoriteValue, idMovie }: MovieDetailsProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const releaseDate = () => {
    if (!detail.release_date) return "-";
    const parseDate = parseISO(detail.release_date);
    const formattedDate = `${format(parseDate, "yyyy")} г.`;
    return formattedDate;
  };

  const formatRuntime = () => {
    if (!detail.runtime) return "-";
    const hours = Math.floor(detail.runtime / 60);
    const remainingMinutes = detail.runtime % 60;
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = remainingMinutes.toString().padStart(2, "0");
    return `${detail.runtime}мин. / ${formattedHours}:${formattedMinutes}`;
  };

  const handleChangePage = (to: string) => {
    navigate(to);
  };

  const handleClickFavorite = () => {
    dispatch(fetchPostFavorite(idMovie));
  };

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center" marginBottom="20px">
        <Typography variant="h4">{detail.title}</Typography>
        <IconButton onClick={handleClickFavorite}>
          {favoriteValue ? <Star sx={{ color: "gold" }} /> : <StarBorder />}
        </IconButton>
      </Stack>
      <IconButton
        onClick={() => {
          handleChangePage("/kino/");
        }}
        sx={{ marginBottom: "20px" }}
      >
        <KeyboardBackspaceIcon />
      </IconButton>
      <Typography variant="h4">О фильме:</Typography>
      <Stack direction="row" gap={"100px"} marginTop="20px">
        <Stack>
          <Typography variant="h5">Страна</Typography>
          <Typography variant="h5">Год</Typography>
          <Typography variant="h5">Жанр</Typography>
          <Typography variant="h5">Бюджет </Typography>
          <Typography variant="h5">Время</Typography>
        </Stack>
        <Stack>
          <Typography variant="h5">
            {detail.origin_country ? detail.origin_country : "-"}
          </Typography>
          <Typography variant="h5">{releaseDate()}</Typography>
          <Typography variant="h5">
            {detail.genres ? detail.genres.map((genre) => `${genre.name} `) : ""}
          </Typography>
          <Typography variant="h5">
            {detail.budget ? `$${detail.budget.toLocaleString()}` : "-"}
          </Typography>
          <Typography variant="h5">{formatRuntime()}</Typography>
        </Stack>
      </Stack>
    </>
  );
};
