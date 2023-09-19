import React, { FC, useState, useEffect, MouseEvent } from "react";
import { Link as ReactRouteLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";

import { Sidebar } from "./sidebar";
import { RightSidebar } from "./RightSidebar";
import { UserProfileMenu } from "./UserProfileMenu";
import { LoginModal } from "../Login/loginModal";
import { SignUpModal } from "../JoinKoy/signUpModal";

import {
  getAuthState,
  setSignInModal,
  setSignUpModal,
  useAppDispatch,
  useAppSelector,
} from "src/store";
import { isMobileDevice } from "src/hook/isMobileDevice";

import "./styles.css";
import "./m.styles.css";

const noHeaderRoutes = ["/policies", "/started", "/contactus"];

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileDeviceType, setMobileDeviceType] = useState(false);
  const [isOpenSidebar, handleOpenSidebar] = useState(false);
  const [isOpenRightSidebar, handleOpenRightSidebar] = useState(false);
  const [noHeader, setNoHeader] = useState(false);
  const [currentUserData, setCurrentUserData] = useState<any | null>(null);

  const checkDeviceType = () => {
    const isMobile = isMobileDevice();
    if (isMobile === true) {
      // This is a mobile device (viewport width is less than or equal to 768px)
      setMobileDeviceType(true);
    } else {
      // This is a desktop device
      setMobileDeviceType(false);
    }
  };

  window.addEventListener("resize", checkDeviceType);

  //Hide Header for Routes in noHeaderRoutes List
  useEffect(() => {
    const pathname = location.pathname;
    const index = noHeaderRoutes.indexOf(pathname);
    if (index >= 0) {
      setNoHeader(true);
    }
  }, [location.pathname]);
  ////////////////////////////////////////////////

  const { profile } = useAppSelector(getAuthState);

  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    if (profile) {
      setLoginStatus(true);
      setCurrentUserData(profile);
    } else {
      setLoginStatus(false);
      setCurrentUserData(null);
    }
  }, [profile]);

  const handleOpenSignUpModal = () => {
    dispatch(setSignUpModal(true));
    dispatch(setSignInModal(false));
  };

  const handleOpenSignInModal = () => {
    dispatch(setSignUpModal(false));
    dispatch(setSignInModal(true));
  };

  return (
    <Box className={`header ${noHeader === true ? "noHeader" : ""}`}>
      <Sidebar isOpen={isOpenSidebar} handleOpenSidebar={handleOpenSidebar} />

      <RightSidebar
        isOpen={isOpenRightSidebar}
        handleOpenRightSidebar={handleOpenRightSidebar}
        currentUserData={currentUserData}
      />

      <LoginModal />

      <SignUpModal />

      <Box className="header-container">
        <Box className="header-section_wrapper">
          <Box className="header-section_1">
            <GiHamburgerMenu
              className="header-menu-icon"
              onClick={() => handleOpenSidebar(!isOpenSidebar)}
            />

            <ReactRouteLink
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
              <img className="image-2" alt="Image" src="/img/image-2.png" />
            </ReactRouteLink>
          </Box>

          <Box className="header-section_2">
            <ReactRouteLink
              to="/whatIsKoy"
              style={{
                textDecoration: "none",
              }}
            >
              <Box className="header2-text">What is KOY</Box>
            </ReactRouteLink>

            <ReactRouteLink
              to="/whyKoy"
              style={{
                textDecoration: "none",
              }}
            >
              <Box className="header2-text">Why build on KOY</Box>
            </ReactRouteLink>

            <ReactRouteLink
              to="/whosKoy"
              style={{
                textDecoration: "none",
              }}
            >
              <Box className="header2-text">Who’s behind KOY</Box>
            </ReactRouteLink>
          </Box>
        </Box>

        {loginStatus ? (
          <UserProfileMenu
            currentUserData={currentUserData}
            isOpenRightSidebar={isOpenRightSidebar}
            handleOpenRightSidebar={handleOpenRightSidebar}
          />
        ) : mobileDeviceType === true ? (
          <Box className="header-btns-wrapper">
            <ReactRouteLink
              to="/joinKoy"
              style={{
                textDecoration: "none",
              }}
            >
              <button className="header-btns">Join KOY</button>
            </ReactRouteLink>

            <ReactRouteLink
              to="/login"
              style={{
                textDecoration: "none",
              }}
            >
              <button className="header-btns">Log In</button>
            </ReactRouteLink>
          </Box>
        ) : (
          <Box className="header-btns-wrapper">
            <button
              className="header-btns"
              onClick={() => handleOpenSignUpModal()}
            >
              Join KOY
            </button>

            <button
              className="header-btns"
              onClick={() => handleOpenSignInModal()}
            >
              Log In
            </button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
