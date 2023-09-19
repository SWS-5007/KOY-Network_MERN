import React, { FC, Dispatch, SetStateAction } from "react";
import { Link as ReactRouteLink } from "react-router-dom";

import { slide as SidebarSlide } from "react-burger-menu";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import TransformIcon from "@mui/icons-material/Transform";
import DownloadIcon from "@mui/icons-material/Download";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdNavigateNext } from "react-icons/md";

import "./styles.css";

interface SidebarProps {
  isOpen: boolean;
  handleOpenRightSidebar: Dispatch<SetStateAction<boolean>>;
  currentUserData: any;
}

export const RightSidebar: FC<SidebarProps> = ({
  isOpen,
  handleOpenRightSidebar,
  currentUserData,
}) => {
  return (
    <Box className="header-rightsidebar-wrapper">
      <SidebarSlide className="sidebarslide" isOpen={isOpen} right>
        <Box className="sidebar-wrapper">
          <Box className="sidebar-header">
            <Typography variant="body1" className="sidebar-header-username">
              {currentUserData && currentUserData.firstname}
            </Typography>

            <Box
              className="sidebar-closeIcon"
              onClick={() => handleOpenRightSidebar(false)}
            >
              <svg width="30" height="30" viewBox="0 0 20 20" fill="none">
                <path
                  d="M15.824 0.375488L10.0007 6.19842L4.17674 0.374882C3.67687 -0.124961 2.86623 -0.124961 2.36636 0.374882L0.375021 2.36639C-0.125158 2.86653 -0.124856 3.67651 0.375021 4.17665L6.19864 9.99989L0.375021 15.8231C-0.125158 16.323 -0.124553 17.1335 0.375021 17.6331L2.36605 19.624C2.86623 20.1238 3.67687 20.1241 4.17644 19.6243L10.0004 13.8014L15.8237 19.6249C16.3239 20.125 17.1339 20.125 17.6338 19.6249L19.6251 17.6337C20.125 17.1341 20.125 16.3233 19.6251 15.8237L13.8018 10.0002L19.6251 4.17726C20.1253 3.67711 20.1247 2.86653 19.6251 2.36699L17.6338 0.37579C17.1342 -0.124658 16.3236 -0.124355 15.824 0.375488Z"
                  fill="#9FA4AA"
                />
              </svg>
            </Box>
          </Box>

          <ReactRouteLink
            to="/settings"
            style={{
              textDecoration: "none",
            }}
          >
            <Box className="sidebar-lists sidebar-lists-border-bottom">
              <Box sx={{ display: "flex", alignItems: "center", gap: "13px" }}>
                <Settings
                  fontSize="small"
                  sx={{ width: "16px", height: "16px" }}
                />

                <Typography className="text-1">Profiles & Settings</Typography>
              </Box>

              <MdNavigateNext />
            </Box>
          </ReactRouteLink>

          <Accordion
            className="TP-Accordion"
            sx={{
              "&.MuiAccordion-root": {
                width: "100%",
                boxShadow: "unset",
                backgroundColor: "transparent",
              },
              "&.MuiAccordion-root.Mui-expanded": {
                display: "flex",
                flexDirection: "column",
                margin: "0px",
              },
              "&.MuiAccordion-root:before": {
                backgroundColor: "unset",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                "&.MuiAccordionSummary-root": {
                  padding: "0px 30px !important",
                  "& .MuiAccordionSummary-content": {
                    display: "flex",
                    alignItems: "center",
                    gap: "13px",
                  },
                  "& .MuiAccordionSummary-expandIconWrapper": {
                    color: "white",
                  },
                },
                "&.MuiAccordionSummary-root.Mui-expanded": {
                  borderBottom: "1px solid white",
                },
                "& .MuiAccordionSummary-content.Mui-expanded": {
                  margin: "0px",
                },
              }}
            >
              <TransformIcon
                fontSize="small"
                sx={{ width: "16px", height: "16px", color: "white" }}
              />

              <Typography className="text-1">
                Transactions & Purchases
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "unset !important",
              }}
            >
              <Box sx={{ width: "80%" }}>
                <ReactRouteLink
                  to="/"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Box className="sidebar-lists sidebar-lists-border-bottom">
                    <Typography className="text-1">My Profile</Typography>

                    <MdNavigateNext />
                  </Box>
                </ReactRouteLink>

                <ReactRouteLink
                  to="/"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Box className="sidebar-lists sidebar-lists-border-bottom">
                    <Typography className="text-1">Wallet</Typography>

                    <MdNavigateNext />
                  </Box>
                </ReactRouteLink>

                <ReactRouteLink
                  to="/"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Box className="sidebar-lists sidebar-lists-border-bottom">
                    <Typography className="text-1">Key Management</Typography>

                    <MdNavigateNext />
                  </Box>
                </ReactRouteLink>

                <ReactRouteLink
                  to="/"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Box className="sidebar-lists ">
                    <Typography className="text-1">
                      Security Perferences
                    </Typography>

                    <MdNavigateNext />
                  </Box>
                </ReactRouteLink>
              </Box>
            </AccordionDetails>
          </Accordion>

          <ReactRouteLink
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            <Box className="sidebar-lists sidebar-lists-border-top sidebar-lists-border-bottom">
              <Box sx={{ display: "flex", alignItems: "center", gap: "13px" }}>
                <Logout
                  fontSize="small"
                  sx={{ width: "16px", height: "16px" }}
                />

                <Typography className="text-1">Sign Out</Typography>
              </Box>

              <MdNavigateNext />
            </Box>
          </ReactRouteLink>

          <ReactRouteLink
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            <Box className="sidebar-lists ">
              <Box sx={{ display: "flex", alignItems: "center", gap: "13px" }}>
                <DownloadIcon
                  fontSize="small"
                  sx={{ width: "16px", height: "16px" }}
                />

                <Typography className="text-1">Install KOY</Typography>
              </Box>

              <MdNavigateNext />
            </Box>
          </ReactRouteLink>
        </Box>
      </SidebarSlide>
    </Box>
  );
};
