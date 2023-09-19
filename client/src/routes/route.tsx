import React from "react";
import { createBrowserRouter } from "react-router-dom";

import {
  NotFoundPage,
  Layout,
  Home,
  TwoFA,
  JoinKoy,
  Login,
  WhatIsKoy,
  WhyKoy,
  WhosKoy,
  Policies,
  Started,
  ContactUs,
  ResetPwdRequest,
  SettingAndProfile,
  ResetPwd,
  TAndPSetting,
} from "../Pages";

import { EmailVerify } from "../Components/EmailVerify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "joinKoy",
        element: <JoinKoy />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "twofa",
        element: <TwoFA />,
      },
      {
        path: "whatIsKoy",
        element: <WhatIsKoy />,
      },
      {
        path: "whyKoy",
        element: <WhyKoy />,
      },
      {
        path: "whosKoy",
        element: <WhosKoy />,
      },

      {
        path: "policies",
        element: <Policies />,
      },
      {
        path: "started",
        element: <Started />,
      },
      {
        path: "contactus",
        element: <ContactUs />,
      },
      {
        path: "/users/:id/verify/:token",
        element: <EmailVerify />,
      },
      {
        path: "repwdrequest",
        element: <ResetPwdRequest />,
      },
      {
        path: "/users/:id/resetpwd",
        element: <ResetPwd />,
      },
      {
        path: "settings",
        element: <SettingAndProfile />,
      },
      {
        path: "t&p_setting",
        element: <TAndPSetting />,
      },
    ],
  },
]);

export default router;
