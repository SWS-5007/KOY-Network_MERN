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
    <Box className="tandp-lists-wrapper">
      <Box
        className={`tandp-list-item buy ${
          settingSubPage === "buy" ? "selected-list-color" : ""
        }`}
        onClick={() => setSettingSubPage("buy")}
        sx={{
          borderTopLeftRadius: "6px",
          borderTopRightRadius: "6px",
        }}
      >
        <Box
          className={`${settingSubPage === "buy" ? "selected-list" : ""}`}
        ></Box>
        Buy KOYN
        <NavigateNextIcon
          fontSize="small"
          sx={{ position: "absolute", right: "13px" }}
        />
      </Box>

      <Box
        className={`tandp-list-item history ${
          settingSubPage === "history" ? "selected-list-color" : ""
        }`}
        onClick={() => setSettingSubPage("history")}
      >
        <Box
          className={`${settingSubPage === "history" ? "selected-list" : ""}`}
        ></Box>
        Transaction History
        <NavigateNextIcon
          fontSize="small"
          sx={{ position: "absolute", right: "13px" }}
        />
      </Box>
    </Box>
  );
};
