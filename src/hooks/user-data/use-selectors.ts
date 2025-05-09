import { useAppSelector } from "../hooks";
import Cookies from "js-cookie";

export const useUserDataSelectors = () => {
  const getTokenFromCookies = () => Cookies.get("token");
  const getIdAccountFromCookies = () => Cookies.get("idAccount");
  const loading = useAppSelector((state) => state.userData.loading);
  const error = useAppSelector((state) => state.userData.error);

  return { token: getTokenFromCookies(), idAccount: getIdAccountFromCookies(), loading, error };
};
