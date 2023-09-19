import React, { FC, useState, useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";

import { SettingLists } from "./SettingLists";
import { Profile } from "./Profile";
import { Wallet } from "./Wallet";
import { KeyManagemenet } from "./KeyManagemenet";
import { Security } from "./Security";

import { getUserKeys } from "src/Api";
import {
  getAuthState,
  getPassKeysState,
  setUserPassKeys,
  useAppDispatch,
  useAppSelector,
} from "src/store";

import "./styles.css";
import "./m.styles.css";

export const SettingsComponent: FC = () => {
  const dispatch = useAppDispatch();

  const { profile } = useAppSelector(getAuthState);
  const { passKeys } = useAppSelector(getPassKeysState);
  const [currentUserData, setCurrentUserData] = useState<any | null>(null);

  useEffect(() => {
    if (profile) {
      setCurrentUserData(profile);
    } else {
      setCurrentUserData(null);
    }
  }, [profile]);

  const handleFetchUserKeys = async () => {
    try {
      const userKeys = await getUserKeys();
      dispatch(setUserPassKeys(userKeys.data.keys));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchUserKeys();
  }, []);

  const [settingSubPage, setSettingSubPage] = useState("profile");

  return (
    <Box className="setting">
      <Box className="ellipse-5" />
      <Box className="overlap-wrapper">
        <Box className="overlap">
          <Box className="setting-container">
            <Box className="container-title-wrapper">
              <Typography variant="body1" className="container-title-1">
                Profile & Settings
              </Typography>

              <Typography variant="body1" className="container-title-2">
                Personalize, Manage & Secure Your Experience
              </Typography>
            </Box>

            <Box className="container-main">
              <SettingLists
                settingSubPage={settingSubPage}
                setSettingSubPage={setSettingSubPage}
              />

              {settingSubPage === "profile" ? (
                <Profile
                  currentUserData={currentUserData}
                  setCurrentUserData={setCurrentUserData}
                />
              ) : settingSubPage === "wallet" ? (
                <Wallet
                  currentUserData={currentUserData}
                  setCurrentUserData={setCurrentUserData}
                />
              ) : settingSubPage === "keymanage" ? (
                <KeyManagemenet />
              ) : settingSubPage === "security" ? (
                <Security
                  currentUserData={currentUserData}
                  setCurrentUserData={setCurrentUserData}
                  setSettingSubPage={setSettingSubPage}
                />
              ) : (
                ""
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
