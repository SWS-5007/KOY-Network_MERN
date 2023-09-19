import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Box, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import "./styles.css";
import "./m.styles.css";

interface Props {
  settingSubPage: string;
  setSettingSubPage: Dispatch<SetStateAction<string>>;
}

export const SettingLists: FC<Props> = ({
  settingSubPage,
  setSettingSubPage,
}) => {
  return (
    <Box className="setting-lists-wrapper">
      <Box
        className={`setting-list-item profile ${
          settingSubPage === "profile" ? "selected-list-color" : ""
        }`}
        onClick={() => setSettingSubPage("profile")}
        sx={{
          borderTopLeftRadius: "6px",
          borderTopRightRadius: "6px",
        }}
      >
        <Box
          className={`${settingSubPage === "profile" ? "selected-list" : ""}`}
        ></Box>
        My Profile
        <NavigateNextIcon
          fontSize="small"
          sx={{ position: "absolute", right: "13px" }}
        />
      </Box>

      <Box
        className={`setting-list-item wallet ${
          settingSubPage === "wallet" ? "selected-list-color" : ""
        }`}
        onClick={() => setSettingSubPage("wallet")}
      >
        <Box
          className={`${settingSubPage === "wallet" ? "selected-list" : ""}`}
        ></Box>
        Wallet
        <NavigateNextIcon
          fontSize="small"
          sx={{ position: "absolute", right: "13px" }}
        />
      </Box>

      <Box
        className={`setting-list-item keymanage ${
          settingSubPage === "keymanage" ? "selected-list-color" : ""
        }`}
        onClick={() => setSettingSubPage("keymanage")}
      >
        <Box
          className={`${settingSubPage === "keymanage" ? "selected-list" : ""}`}
        ></Box>
        Key Management
        <NavigateNextIcon
          fontSize="small"
          sx={{ position: "absolute", right: "13px" }}
        />
      </Box>

      <Box
        className={`setting-list-item security ${
          settingSubPage === "security" ? "selected-list-color" : ""
        }`}
        onClick={() => setSettingSubPage("security")}
        sx={{
          borderBottomLeftRadius: "6px",
          borderBottomRightRadius: "6px",
        }}
      >
        <Box
          className={`${settingSubPage === "security" ? "selected-list" : ""}`}
        ></Box>
        Security Preferences
        <NavigateNextIcon
          fontSize="small"
          sx={{ position: "absolute", right: "13px" }}
        />
      </Box>
    </Box>
  );
};
