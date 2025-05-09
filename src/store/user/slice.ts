import Cookies from "js-cookie";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./initial-state";
import { fetchCheckToken } from "./thunks/fetch-check-token";
import { fetchIdAccount } from "./thunks/fetch-id-account";
import {
  FETCH_AUTH_ACCOUNT_FAILED,
  FETCH_AUTH_ACCOUNT_SUCCEEDED,
  type FetchAuthAccountFailedAction,
} from "./middleware/auth-account-middleware";

export interface UserData {
  token: string | undefined;
  idAccount: string | undefined;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const userSlice = createSlice({
  name: "userData",
  initialState: initialState as UserData,
  reducers: {
    setUserDataLoading(state, action: PayloadAction<"pending">) {
      state.loading = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCheckToken.fulfilled, (_, action) => {
      if (action.payload) Cookies.set("token", action.payload, { expires: 30 });
    });
    builder.addCase(fetchIdAccount.fulfilled, (_, action) => {
      if (action.payload) Cookies.set("idAccount", action.payload, { expires: 30 });
    });
    builder.addCase(FETCH_AUTH_ACCOUNT_SUCCEEDED, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(FETCH_AUTH_ACCOUNT_FAILED, (state, action: FetchAuthAccountFailedAction) => {
      Cookies.set("token", "");
      Cookies.set("idAccount", "");
      state.loading = "failed";
      state.error = action.payload;
    });
  },
});

export const { setUserDataLoading } = userSlice.actions;

export default userSlice.reducer;
