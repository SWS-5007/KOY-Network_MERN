import React, { FC, Dispatch, SetStateAction } from "react";
import { Link as ReactRouteLink } from "react-router-dom";

import { slide as SidebarSlide } from "react-burger-menu";
import { MdNavigateNext } from "react-icons/md";

import "./sidebar.styles.css";

interface SidebarProps {
  isOpen: boolean;
  handleOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar: FC<SidebarProps> = ({ isOpen, handleOpenSidebar }) => {
  return (
    <div className="header-sidebar-wrapper">
      <SidebarSlide className="sidebarslide" isOpen={isOpen}>
        <div className="sidebar-wrapper">
          <div
            className="sidebar-closeIcon"
            onClick={() => handleOpenSidebar(false)}
          >
            <svg width="30" height="30" viewBox="0 0 20 20" fill="none">
              <path
                d="M15.824 0.375488L10.0007 6.19842L4.17674 0.374882C3.67687 -0.124961 2.86623 -0.124961 2.36636 0.374882L0.375021 2.36639C-0.125158 2.86653 -0.124856 3.67651 0.375021 4.17665L6.19864 9.99989L0.375021 15.8231C-0.125158 16.323 -0.124553 17.1335 0.375021 17.6331L2.36605 19.624C2.86623 20.1238 3.67687 20.1241 4.17644 19.6243L10.0004 13.8014L15.8237 19.6249C16.3239 20.125 17.1339 20.125 17.6338 19.6249L19.6251 17.6337C20.125 17.1341 20.125 16.3233 19.6251 15.8237L13.8018 10.0002L19.6251 4.17726C20.1253 3.67711 20.1247 2.86653 19.6251 2.36699L17.6338 0.37579C17.1342 -0.124658 16.3236 -0.124355 15.824 0.375488Z"
                fill="#9FA4AA"
              />
            </svg>
          </div>

          <ReactRouteLink
            to="/whatIsKoy"
            style={{
              textDecoration: "none",
            }}
          >
            <div className="sidebar-lists sidebar-lists-border-bottom">
              What is KOY <MdNavigateNext />
            </div>
          </ReactRouteLink>

          <ReactRouteLink
            to="/whyKoy"
            style={{
              textDecoration: "none",
            }}
          >
            <div className="sidebar-lists sidebar-lists-border-bottom">
              Why build on KOY <MdNavigateNext />
            </div>
          </ReactRouteLink>

          <ReactRouteLink
            to="/whosKoy"
            style={{
              textDecoration: "none",
            }}
          >
            <div className="sidebar-lists">
              Who's behind KOY <MdNavigateNext />
            </div>
          </ReactRouteLink>

          <div
            className="sidebar-lists sidebar-lists-border-bottom"
            style={{ marginTop: "70px" }}
          >
            Help Centre
            <MdNavigateNext />
          </div>

          <ReactRouteLink
            to="/policies"
            style={{
              textDecoration: "none",
            }}
          >
            <div className="sidebar-lists sidebar-lists-border-bottom">
              Terms of Service <MdNavigateNext />
            </div>
          </ReactRouteLink>

          <div className="sidebar-lists sidebar-lists-border-bottom">
            Privacy Policy <MdNavigateNext />
          </div>

          <div className="sidebar-lists">
            Contact Us <MdNavigateNext />
          </div>

          <div
            className="sidebar-lists sidebar-lists-border-bottom"
            style={{ marginTop: "70px" }}
          >
            Facebook <MdNavigateNext />
          </div>

          <div className="sidebar-lists">
            Telegram <MdNavigateNext />
          </div>

          <div className="sidebar-btns-wrapper">
            <button className="sidebar-btns">Join KOY</button>

            <button className="sidebar-btns">Log In</button>
          </div>
        </div>
      </SidebarSlide>
    </div>
  );
};
