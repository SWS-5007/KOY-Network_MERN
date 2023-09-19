import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Box, Typography, Divider } from "@mui/material";

import { SettingLists } from "./SettingLists";
import { BuyKOYN } from "./BuyKOYN";
import { WalletBuyKOYN } from "./WalletBuyKOYN";
import { TransactionHistory } from "./TransactionHistory";

import { getAuthState, useAppSelector } from "src/store";

import "./styles.css";
import "./m.styles.css";

export const TAndPSettingComponent: FC = () => {
  const { profile } = useAppSelector(getAuthState);
  const [currentUserData, setCurrentUserData] = useState<any | null>(null);
  const [settingSubPage, setSettingSubPage] = useState("buy");
  const [walletConnectStatus, setWalletConnectStatus] = useState(false);
  const [metamaskAccounts, setMetamaskAccounts] = useState<any | null>(null);

  useEffect(() => {
    if (profile) {
      setCurrentUserData(profile);
    } else {
      setCurrentUserData(null);
    }
  }, [profile]);

  return (
    <Box className="tandp">
      <Box className="ellipse-5" />
      <Box className="overlap-wrapper">
        <Box className="overlap">
          <Box className="tandp-container">
            <Box className="container-title-wrapper">
              <Typography variant="body1" className="container-title-1">
                Transactions & Purchases
              </Typography>

              <Typography variant="body1" className="container-title-2">
                Your Gateway to Digital Trade & Transactions
              </Typography>
            </Box>

            <Box className="container-main">
              <SettingLists
                settingSubPage={settingSubPage}
                setSettingSubPage={setSettingSubPage}
              />

              {settingSubPage === "buy" ? (
                walletConnectStatus ? (
                  <WalletBuyKOYN
                    metamaskAccounts={metamaskAccounts}
                    setMetamaskAccounts={setMetamaskAccounts}
                    setWalletConnectStatus={setWalletConnectStatus}
                  />
                ) : (
                  <BuyKOYN
                    currentUserData={currentUserData}
                    setCurrentUserData={setCurrentUserData}
                    setWalletConnectStatus={setWalletConnectStatus}
                    setMetamaskAccounts={setMetamaskAccounts}
                  />
                )
              ) : settingSubPage === "history" ? (
                <TransactionHistory
                  currentUserData={currentUserData}
                  setCurrentUserData={setCurrentUserData}
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
