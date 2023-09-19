import { createSlice } from "@reduxjs/toolkit";
import { TRootState } from "..";

export type TKeys = {
  id: string;
  userId: string;
  newPrivateKey: string;
  newPublicKey: string;
  understandStatus: boolean;
  storageStatus: boolean;
  createdAt: Date;
};

export type TPassKeysState = {
  passKeys: TKeys | null;
};

const initialState: TPassKeysState = {
  passKeys: null,
};

export const passKeysSlice = createSlice({
  name: "passKeys",
  initialState,
  reducers: {
    setUserPassKeys: (state, action) => {
      state.passKeys = action.payload;
    },
  },
});

export const { setUserPassKeys } = passKeysSlice.actions;

export const getPassKeysState = (state: TRootState) => {
  return state.passKeys;
};

export default passKeysSlice.reducer;
