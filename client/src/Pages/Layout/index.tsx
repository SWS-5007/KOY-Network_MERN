import React, { FC, useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";

import { getProfileApi } from "src/Api";
import {
  setProfile,
  setSignUpModal,
  setSignInModal,
  useAppDispatch,
  useAppSelector,
} from "src/store";
import { isMobileDevice } from "src/hook/isMobileDevice";

import "./styles.css";

const noNeedUserLoginRoutes = [
  "/",
  "/joinKoy",
  "/login",
  "/users/:id/verify/:token",
  "/repwdrequest",
  "/whatIsKoy",
  "/whyKoy",
  "/whosKoy",
  "/policies",
  "/started",
  "/contactus",
];

export const Layout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCheckRoute = (currentRoute: string) => {
    const splitedString = currentRoute.split("/");
    if (splitedString[1] === "users") {
      return true;
    } else {
      const index = noNeedUserLoginRoutes.indexOf(currentRoute);
      if (index >= 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  async function fetchProfile(currentRoute: string) {
    const checkRoute = handleCheckRoute(currentRoute);
    if (checkRoute === false) {
      try {
        const getProfile = await getProfileApi();
        dispatch(setProfile(getProfile.data.user));
      } catch (error: any) {
        console.error("Layout Fetch Profile Error", error);
        console.log("User must be logged in!");
        const isMobile = isMobileDevice();
        if (isMobile === false) {
          dispatch(setSignInModal(true));
          dispatch(setSignUpModal(false));
        } else {
          navigate("/login");
        }
      }
    }
  }

  useEffect(() => {
    fetchProfile(location.pathname);
  }, []);

  useEffect(() => {
    fetchProfile(location.pathname);

    if (location.pathname === "/joinKoy" || location.pathname === "/login") {
      const isMobile = isMobileDevice();
      if (isMobile === false) {
        navigate("/");
      }
    }
  }, [location.pathname]);

  return (
    <div
      className="layout"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div className="ellipse" />

      <Header />

      {/* //////////////////////Main Content////////////////////////////// */}
      <div className="layout-main">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
