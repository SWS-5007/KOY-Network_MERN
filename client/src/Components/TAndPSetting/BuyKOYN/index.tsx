import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";

import { Box, Typography, Divider } from "@mui/material";

import { setProfile, useAppDispatch } from "src/store";

import "./styles.css";
import "./m.styles.css";

interface Props {
  currentUserData: any;
  setCurrentUserData: Dispatch<SetStateAction<any>>;
  setWalletConnectStatus: Dispatch<SetStateAction<boolean>>;
  setMetamaskAccounts: Dispatch<SetStateAction<any>>;
}

interface ErrorProps {
  value: boolean | string;
  errorMsg: string;
}

export const BuyKOYN: FC<Props> = ({
  currentUserData,
  setCurrentUserData,
  setWalletConnectStatus,
  setMetamaskAccounts,
}) => {
  const dispatch = useAppDispatch();
  const { ethereum } = window as any;

  const checkIfHasMetamask = () => {
    if (!ethereum) {
      setWalletConnectStatus(false);
      alert("You should install the Metamask!");
      return false;
    } else {
      return true;
    }
  };

  const handleConnectWallet = async () => {
    try {
      checkIfHasMetamask();

      await ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((res: any) => {
          setMetamaskAccounts(res);
          setWalletConnectStatus(true);
        })
        .catch((err: any) => {
          console.log("Connect Metamask Error", err);
        });
    } catch (error: any) {
      console.log(error.message);
      alert("You should login in Metamask Wallet");
    }
  };

  const handleBuyKOYN = () => {};

  const handleCancel = () => {};

  return (
    <Box className="tandp-list-content-buy">
      <Box className="tandp-buy-wrapper">
        <Box className="content-title">
          <Typography variant="body1" className="content-title-1">
            Buy KOYN
          </Typography>

          <Typography variant="body1" className="content-title-2">
            Your Gateway to Owning KOYN
          </Typography>
        </Box>

        <Box className="content-main">
          <Box className="main_child child_1">
            <Typography variant="body1" className="main_child_title">
              Connect Account
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "50%",
              }}
            >
              <button
                className="button"
                onClick={() => handleConnectWallet()}
                style={{ width: "100%" }}
              >
                Connect Ethereum Wallet
              </button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider
        sx={{
          position: "relative",
          width: "calc(100% + 40px)",
          left: "-20px",
          backgroundColor: "white",
          margin: "20px 0px",
        }}
      />

      <Box className="tandp-buy-btns">
        <button className="button" onClick={() => handleCancel()}>
          Cancel
        </button>

        <button className="button" onClick={() => handleBuyKOYN()}>
          Buy KOYN
        </button>
      </Box>
    </Box>
  );
};
