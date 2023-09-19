import React, { FC, useState, useEffect } from "react";
import axios from "axios";

import { Box, Backdrop, CircularProgress } from "@mui/material";

import { UserInfoSection } from "./UserInfoSection";
import { CountrySection } from "./CountrySection";
import { WelcomeSection } from "./WelcomeSection";

import { NewUserDataType } from "src/Types";

import "./m.styles.css";

export const JoinKoyComponent: FC = () => {
  const [joinKoyStep, setJoinKoyStep] = useState(0);

  const BASE_API = process.env.REACT_APP_BASE_API;

  const [newUserData, setNewUserData] = useState<NewUserDataType>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    country: "United States",
    id_type: "Driver License",
    national_id: 0,
    referral_code: "",
  });

  const [openProgress, setOpenProgress] = useState(false);

  const handleRegister = () => {
    setOpenProgress(true);

    axios({
      method: "POST",
      data: newUserData,
      withCredentials: true,
      url: BASE_API + "/api/register",
    })
      .then((res) => {
        console.log(res.data, "register_response");
        setJoinKoyStep(2);
        setOpenProgress(false);
      })
      .catch((error) => {
        console.log("User Register Error", error);
        alert(error.message);
        setOpenProgress(false);
        return;
      });
  };

  return (
    <Box className="joinkoy">
      <Box className="overlap-wrapper">
        <Box className="overlap">
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openProgress}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          {joinKoyStep === 0 ? (
            <UserInfoSection
              setJoinKoyStep={setJoinKoyStep}
              newUserData={newUserData}
              setNewUserData={setNewUserData}
            />
          ) : joinKoyStep === 1 ? (
            <CountrySection
              setJoinKoyStep={setJoinKoyStep}
              newUserData={newUserData}
              setNewUserData={setNewUserData}
              handleRegister={handleRegister}
            />
          ) : (
            <WelcomeSection newUserData={newUserData} />
          )}
          <Box className="ellipse-5" />
        </Box>
      </Box>
    </Box>
  );
};
