import React, {
  FC,
  useState,
  useEffect,
  MouseEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { Link as ReactRouteLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Divider,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import TransformIcon from "@mui/icons-material/Transform";
import DownloadIcon from "@mui/icons-material/Download";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { setProfile, useAppDispatch, useAppSelector } from "src/store";

import "./styles.css";
import "./m.styles.css";

interface Props {
  currentUserData: any;
  isOpenRightSidebar: boolean;
  handleOpenRightSidebar: Dispatch<SetStateAction<boolean>>;
  // handleRegister: () => void;
}

export const UserProfileMenu: FC<Props> = ({
  currentUserData,
  isOpenRightSidebar,
  handleOpenRightSidebar,
}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [anchorElProfileMenu, setAnchorElProfileMenu] =
    useState<null | HTMLElement>(null);
  const openProfileMenu = Boolean(anchorElProfileMenu);
  const handleClickProfileIcon = (event: MouseEvent<HTMLElement>) => {
    setAnchorElProfileMenu(event.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setAnchorElProfileMenu(null);
  };

  const handleSignOut = () => {
    // Initialize the User Profile Data
    dispatch(setProfile(null));

    // Clear the Local Storage
    localStorage.removeItem("login_jwt_token");

    // Clear the Cookies
    document.cookie =
      "login_jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Ridirect to Home  Page
    navigate("/");
  };

  return (
    <Box className="header-user-wrapper">
      <Typography className="header-user-name" variant="body1">
        {currentUserData.firstname}
      </Typography>

      {/* Mobile UserIcon Button (Open/Close the Right Sidebar for Mobile)*/}
      <IconButton
        className="mobile-header-user-iconbtn"
        size="small"
        onClick={() => handleOpenRightSidebar(!isOpenRightSidebar)}
      >
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <path
            d="M17 0C7.62374 0 0 7.62374 0 17C0 26.3762 7.62374 34 17 34C26.3763 34 34 26.3762 34 17C34 7.62374 26.3763 0 17 0ZM17 2.125C25.2278 2.125 31.875 8.77218 31.875 17C31.875 20.6563 30.5583 24.0083 28.3776 26.5957C26.4764 22.1929 22.1005 19.125 17 19.125C11.8995 19.125 7.52358 22.1929 5.6224 26.5957C3.44171 24.0083 2.125 20.6563 2.125 17C2.125 8.77218 8.77218 2.125 17 2.125ZM17 5.3125C13.4918 5.3125 10.625 8.17927 10.625 11.6875C10.625 15.1957 13.4918 18.0625 17 18.0625C20.5082 18.0625 23.375 15.1957 23.375 11.6875C23.375 8.17927 20.5082 5.3125 17 5.3125ZM17 7.4375C19.3598 7.4375 21.25 9.32771 21.25 11.6875C21.25 14.0473 19.3598 15.9375 17 15.9375C14.6402 15.9375 12.75 14.0473 12.75 11.6875C12.75 9.32771 14.6402 7.4375 17 7.4375ZM17 21.25C21.5582 21.25 25.3693 24.1817 26.7285 28.2559C24.1212 30.5125 20.7267 31.875 17 31.875C13.2733 31.875 9.87885 30.5125 7.27148 28.2559C8.63074 24.1817 12.4418 21.25 17 21.25Z"
            fill="#3F4955"
          />
        </svg>
      </IconButton>
      {/* //////////////////////////////////////////////////////////////// */}

      <IconButton
        className="header-user-iconbtn"
        onClick={handleClickProfileIcon}
        size="small"
        aria-controls={openProfileMenu ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openProfileMenu ? "true" : undefined}
      >
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <path
            d="M17 0C7.62374 0 0 7.62374 0 17C0 26.3762 7.62374 34 17 34C26.3763 34 34 26.3762 34 17C34 7.62374 26.3763 0 17 0ZM17 2.125C25.2278 2.125 31.875 8.77218 31.875 17C31.875 20.6563 30.5583 24.0083 28.3776 26.5957C26.4764 22.1929 22.1005 19.125 17 19.125C11.8995 19.125 7.52358 22.1929 5.6224 26.5957C3.44171 24.0083 2.125 20.6563 2.125 17C2.125 8.77218 8.77218 2.125 17 2.125ZM17 5.3125C13.4918 5.3125 10.625 8.17927 10.625 11.6875C10.625 15.1957 13.4918 18.0625 17 18.0625C20.5082 18.0625 23.375 15.1957 23.375 11.6875C23.375 8.17927 20.5082 5.3125 17 5.3125ZM17 7.4375C19.3598 7.4375 21.25 9.32771 21.25 11.6875C21.25 14.0473 19.3598 15.9375 17 15.9375C14.6402 15.9375 12.75 14.0473 12.75 11.6875C12.75 9.32771 14.6402 7.4375 17 7.4375ZM17 21.25C21.5582 21.25 25.3693 24.1817 26.7285 28.2559C24.1212 30.5125 20.7267 31.875 17 31.875C13.2733 31.875 9.87885 30.5125 7.27148 28.2559C8.63074 24.1817 12.4418 21.25 17 21.25Z"
            fill="#3F4955"
          />
        </svg>
      </IconButton>

      <Menu
        id="profile-menu"
        className="profile-menu-wrapper"
        anchorEl={anchorElProfileMenu}
        open={openProfileMenu}
        onClose={handleCloseProfileMenu}
        onClick={handleCloseProfileMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&.MuiPaper-root": {
              minWidth: "300px",
              backgroundColor: "#2b2c2f !important",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) !important",
              color: "white",

              "& .MuiList-root": {
                "& .MuiButtonBase-root": {
                  height: "50px",
                  ":hover": {
                    color: "#f28706",
                    backgroundColor: "rgba(65, 129, 220, 0.05) !important",
                    "& .header-profile-menu-item-span": {
                      background: "#f28706 !important",
                    },
                  },
                },
              },
            },

            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <ReactRouteLink
          to="/settings"
          style={{
            textDecoration: "none",
            color: "unset",
          }}
        >
          <MenuItem
            className="header-profile-menu-item"
            onClick={handleCloseProfileMenu}
          >
            <span className="header-profile-menu-item-span"></span>
            <ListItemIcon sx={{ color: "white" }}>
              <Settings
                fontSize="small"
                sx={{ width: "16px", height: "16px" }}
              />
            </ListItemIcon>
            Profiles & Settings
            <NavigateNextIcon
              className="header-profile-menu-next-icon"
              fontSize="small"
            />
          </MenuItem>
        </ReactRouteLink>

        <Divider sx={{ backgroundColor: "white", margin: "0px !important" }} />

        <ReactRouteLink
          to="/t&p_setting"
          style={{
            textDecoration: "none",
            color: "unset",
          }}
        >
          <MenuItem className="header-profile-menu-item">
            <span className="header-profile-menu-item-span"></span>
            <ListItemIcon sx={{ color: "white" }}>
              <TransformIcon
                fontSize="small"
                sx={{ width: "16px", height: "16px" }}
              />
            </ListItemIcon>
            Transactions & Purchases
            <NavigateNextIcon
              className="header-profile-menu-next-icon"
              fontSize="small"
            />
          </MenuItem>
        </ReactRouteLink>

        <Divider sx={{ backgroundColor: "white", margin: "0px !important" }} />

        <MenuItem
          className="header-profile-menu-item"
          onClick={() => handleSignOut()}
        >
          <span className="header-profile-menu-item-span"></span>
          <ListItemIcon sx={{ color: "white" }}>
            <Logout fontSize="small" sx={{ width: "16px", height: "16px" }} />
          </ListItemIcon>
          Sign Out
          <NavigateNextIcon
            className="header-profile-menu-next-icon"
            fontSize="small"
          />
        </MenuItem>
        <Divider sx={{ backgroundColor: "white", margin: "0px !important" }} />

        <MenuItem className="header-profile-menu-item">
          <span className="header-profile-menu-item-span"></span>
          <ListItemIcon sx={{ color: "white" }}>
            <DownloadIcon
              fontSize="small"
              sx={{ width: "16px", height: "16px" }}
            />
          </ListItemIcon>
          Install Koy
          <NavigateNextIcon
            className="header-profile-menu-next-icon"
            fontSize="small"
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};
