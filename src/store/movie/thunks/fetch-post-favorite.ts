import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../index";
import Cookies from "js-cookie";
import { toggleFavoriteMovie } from "../slice";

interface PostFavoriteResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}

export const fetchPostFavorite = createAsyncThunk<
  PostFavoriteResponse,
  number,
  { state: RootState }
>("movie/fetchPostFavorite", async (idMovie, { getState, dispatch, rejectWithValue }) => {
  const { favoriteMovie } = getState().movie;
  const isFavorite = favoriteMovie.includes(idMovie);
  dispatch(toggleFavoriteMovie(idMovie));
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    body: JSON.stringify({
      media_type: "movie",
      media_id: idMovie,
      favorite: !isFavorite,
    }),
  };

  try {
    const request = await fetch(
      `https://api.themoviedb.org/3/account/${Cookies.get("idAccount")}/favorite`,
      options,
    );
    if (!request.ok) throw new Error(`Ошибка запроса ${request.status}`);
    return await request.json();
  } catch (error: any) {
    dispatch(toggleFavoriteMovie(idMovie));
    alert(error.message);
    rejectWithValue(error.message);
  }
});
