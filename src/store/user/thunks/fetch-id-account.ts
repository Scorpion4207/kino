import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UserData } from "../slice";
import type { RootState } from "../../index";

export const fetchIdAccount = createAsyncThunk<UserData["idAccount"], string, { state: RootState }>(
  "userData/fetchIdAccount",
  async (inputToken, { rejectWithValue }) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${inputToken}`,
      },
    };

    try {
      const request = await fetch("https://api.themoviedb.org/3/account/account_id", options);
      if (!request.ok) throw new Error(`Ошибка запроса ${request.status}`);
      const data = await request.json();
      const id = await data.id;
      return id;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);
