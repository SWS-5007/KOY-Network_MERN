import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { authReducer, passKeyReducer, signInAndUpModalReducer } from "./slices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    passKeys: passKeyReducer,
    signInUpModal: signInAndUpModalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  TRootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export * from "./slices";
