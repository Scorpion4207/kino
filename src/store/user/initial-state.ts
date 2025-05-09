import Cookies from "js-cookie";
import type { UserData } from "./slice";

export const initialState: UserData = {
  token: Cookies.get("token"),
  idAccount: Cookies.get("idAccount"),
  loading: "idle",
  error: null,
};
