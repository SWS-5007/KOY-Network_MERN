import React, { FC, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import "typeface-roboto";

import theme from "./theme";

import { router } from "./routes";

import {
  getAuthState,
  setJWTToken,
  useAppDispatch,
  useAppSelector,
} from "./store";

import "./App.css";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { login_jwt_token } = useAppSelector(getAuthState);

  const storage_jwt_token = localStorage.getItem("login_jwt_token");

  const initData = () => {
    dispatch(setJWTToken(storage_jwt_token));
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
};

export default App;
