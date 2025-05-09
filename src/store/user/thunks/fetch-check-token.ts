import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../index";
import type { UserData } from "../slice";

export const fetchCheckToken = createAsyncThunk<UserData["token"], string, { state: RootState }>(
  "userData/fetchCheckToken",
  async (inputToken, { rejectWithValue }) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${inputToken}`,
      },
    };

    try {
      const request = await fetch("https://api.themoviedb.org/3/authentication", options);
      if (!request.ok) throw new Error(`Ошибка запроса ${request.status}`);
      return inputToken;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);
