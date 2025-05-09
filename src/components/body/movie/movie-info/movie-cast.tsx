import { Box, Card, CardActions, CardMedia, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination } from "swiper/modules";
import type { CreditsMovie } from "../../../../ts/shared/types";

export const MovieCasts = ({ casts }: { casts: CreditsMovie[] }) => (
  <Box sx={{ padding: "25px" }}>
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={9}
      navigation
      pagination={{ clickable: true }}
    >
      {casts.map((cast) => (
        <SwiperSlide key={cast.id}>
          <Card sx={{ marginBottom: "50px" }}>
            <CardMedia
              height="210"
              component="img"
              image={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
              alt="movie poster"
            />
            <CardActions>
              <Typography variant="body2">{cast.name}</Typography>
            </CardActions>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  </Box>
);
