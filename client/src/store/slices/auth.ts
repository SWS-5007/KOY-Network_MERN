import { createSlice } from "@reduxjs/toolkit";
import { TRootState } from "..";

export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  id_type: string;
  national_id: string;
  password: string;
  verified: boolean;
  sms_verified: boolean;
  passkey_verified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TAuthState = {
  profile: TUser | null;
  login_jwt_token: string;
};

const initialState: TAuthState = {
  login_jwt_token: "",
  profile: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setJWTToken: (state, action) => {
      state.login_jwt_token = action.payload;
    },

    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setJWTToken, setProfile } = authSlice.actions;

export const getAuthState = (state: TRootState) => {
  return state.auth;
};

export default authSlice.reducer;
