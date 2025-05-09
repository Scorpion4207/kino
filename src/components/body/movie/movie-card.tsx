import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../../hooks/hooks";
import { setDetailsCreditsIdle } from "../../../store/movie/slice";
import { fetchPostFavorite } from "../../../store/movie/thunks/fetch-post-favorite";

interface MovieСardProps {
  cardMovie: string | undefined;
  title: string | undefined;
  idMovie: string;
  average: number | undefined;
  favoriteValue: boolean;
}

export const MovieСard = ({
  cardMovie,
  title,
  idMovie,
  average,
  favoriteValue,
}: MovieСardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClickFavorite = () => {
    dispatch(fetchPostFavorite(+idMovie));
  };

  const handleChangePage = () => {
    navigate(`/film/${idMovie}`);
    dispatch(setDetailsCreditsIdle());
  };

  return (
    <Card sx={{ maxWidth: 345, cursor: "pointer" }}>
      <CardMedia
        onClick={handleChangePage}
        height="500"
        component="img"
        image={cardMovie}
        alt="movie poster"
      />
      <CardActions
        sx={{
          dysplay: "flex",
          justifyContent: "space-between",
          minWidth: "330px",
        }}
      >
        <CardContent>
          <Typography onClick={handleChangePage} variant="h6">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Рейтинг {average?.toFixed(1)}
          </Typography>
        </CardContent>
        <IconButton onClick={handleClickFavorite}>
          {favoriteValue ? <Star sx={{ color: "gold" }} /> : <StarBorder />}
        </IconButton>
      </CardActions>
    </Card>
  );
};
