import type { Action, Middleware } from "redux";
import type { AppDispatch, RootState } from "../../index";
import { setUserDataLoading } from "../slice";
import { fetchCheckToken } from "../thunks/fetch-check-token";
import { fetchIdAccount } from "../thunks/fetch-id-account";

export const FETCH_AUTH_ACCOUNT = "userData/fetchAuthAccount";
export const FETCH_AUTH_ACCOUNT_SUCCEEDED = "userData/fetchAuthAccountSucceeded";
export const FETCH_AUTH_ACCOUNT_FAILED = "userData/fetchAuthAccountFailed";

interface fetchAuthAccountPayload {
  token: string;
}

export interface FetchAuthAccountFailedAction extends Action<typeof FETCH_AUTH_ACCOUNT_FAILED> {
  payload: any;
}

export const fetchAuthAccountFailedAction = (payload: any) => ({
  type: FETCH_AUTH_ACCOUNT_FAILED,
  payload,
});

interface FetchAuthAccountAction extends Action<typeof FETCH_AUTH_ACCOUNT> {
  payload: fetchAuthAccountPayload;
}

export const fetchAuthAccountAction = (payload: fetchAuthAccountPayload) => ({
  type: FETCH_AUTH_ACCOUNT,
  payload,
});

export const fetchAuthAccountMiddleware: Middleware<{}, RootState, AppDispatch> =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);

    if (action && typeof action === "object" && (action as Action).type === FETCH_AUTH_ACCOUNT) {
      const { token } = (action as FetchAuthAccountAction).payload;
      dispatch(setUserDataLoading("pending"));
      try {
        const result = await Promise.allSettled([
          dispatch(fetchCheckToken(token)),
          dispatch(fetchIdAccount(token)),
        ]);
        const allFulfilled = result.every((res) => res.status === "fulfilled");
        if (allFulfilled) {
          dispatch({ type: FETCH_AUTH_ACCOUNT_SUCCEEDED });
        } else {
          throw new Error("Неудалось авторизоваться !");
        }
      } catch (error: any) {
        dispatch(fetchAuthAccountFailedAction(error));
      }
    }
  };
