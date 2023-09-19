import { createSlice } from "@reduxjs/toolkit";
import { TRootState } from "..";

export type TSignInUpModalState = {
  signUpModal: boolean;
  signInModal: boolean;
};

const initialState: TSignInUpModalState = {
  signInModal: false,
  signUpModal: false,
};

export const signInUpModalSlice = createSlice({
  name: "signInUpModal",
  initialState,
  reducers: {
    setSignInModal: (state, action) => {
      state.signInModal = action.payload;
    },

    setSignUpModal: (state, action) => {
      state.signUpModal = action.payload;
    },
  },
});

export const { setSignInModal, setSignUpModal } = signInUpModalSlice.actions;

export const getSignInUpModalState = (state: TRootState) => {
  return state.signInUpModal;
};

export default signInUpModalSlice.reducer;
