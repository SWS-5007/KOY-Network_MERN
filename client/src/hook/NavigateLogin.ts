import React, {
  FC,
  useState,
  useEffect,
  MouseEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";

import {
  setProfile,
  setSignUpModal,
  setSignInModal,
  useAppDispatch,
  useAppSelector,
} from "src/store";

import { isMobileDevice } from "src/hook/isMobileDevice";

export const NavigateLogin = (user: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isMobile = isMobileDevice();
  if (isMobile === false) {
    dispatch(setSignInModal(false));
    dispatch(setSignUpModal(false));
  }

  if (user.sms_verified === true) {
    navigate("/");
  } else {
    navigate("/twofa");
  }
};
