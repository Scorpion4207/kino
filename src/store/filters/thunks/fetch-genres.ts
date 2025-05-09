import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../index";
import { API } from "../../../ts/services/API";
import type { Genre } from "../../../ts/shared/types";
import Cookies from "js-cookie";

const { URL_SERVER, ENDPOINT_GENRE } = API;

export const fetchGenres = createAsyncThunk<
  Genre[],
  void,
  {
    state: RootState;
  }
>("filters/fetchGenres", async (_, { rejectWithValue }) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };
    const request = await fetch(URL_SERVER + ENDPOINT_GENRE, options);
    if (!request.ok) throw new Error(`Ошибка запроса ${request.status}`);
    const data = await request.json();
    return data.genres;
  } catch (error) {
    return rejectWithValue(error);
  }
});
