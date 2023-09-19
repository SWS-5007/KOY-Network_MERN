import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { Api, JsonRpc, RpcError } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig"; // development only

import { Box, Typography, Divider } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { setProfile, useAppDispatch } from "src/store";

import "./styles.css";
import "./m.styles.css";

interface Props {
  currentUserData: any;
  setCurrentUserData: Dispatch<SetStateAction<any>>;
  // handleRegister: () => void;
}

interface ErrorProps {
  value: boolean | string;
  errorMsg: string;
}

export const Wallet: FC<Props> = ({ currentUserData, setCurrentUserData }) => {
  const dispatch = useAppDispatch();
  const [NewUserData, setNewUserData] = useState<any | null>(null);

  const [error, setError] = useState<ErrorProps>({
    value: false,
    errorMsg: "",
  });

  const [account, setAccount] = useState("");
  const handleChangeAccount = (event: SelectChangeEvent) => {
    setAccount(event.target.value as string);
  };

  const handleChangeBalance = (value: string) => {};

  const handleConnectWallet = async () => {};

  const handleUpdateBalance = () => {};

  return (
    <Box className="setting-list-content-wallet">
      <Box className="setting-wallet-wrapper">
        <Box className="content-title">
          <Typography variant="body1" className="content-title-1">
            Wallet
          </Typography>

          <Typography variant="body1" className="content-title-2">
            Your Digital Wallet, Your Digital World
          </Typography>
        </Box>

        <Box className="content-main">
          <Box className="main_child child_1">
            <Typography variant="body1" className="main_child_title">
              Selected Account
            </Typography>

            <Box
              className="main_child_driverlicenceselect"
              sx={{
                width: "50%",
              }}
            >
              <Select
                value={account}
                onChange={handleChangeAccount}
                sx={{
                  "&.MuiInputBase-root": {
                    width: "100%",
                    borderRadius: "6px",
                    "& .MuiOutlinedInput-input": {
                      padding: "8px 14px !important",
                    },
                    "& fieldset": {
                      border: "none !important",
                      borderRadius: "6px",
                    },
                  },
                }}
              >
                <MenuItem value={"3e2hn"}>3e2hn</MenuItem>
              </Select>
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: "white", margin: "10px 0px" }} />

          <Box className="main_child child_1">
            <Typography variant="body1" className="main_child_title">
              KOYN Balance
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "50%",
              }}
            >
              <input
                type="number"
                className="setting_input national_id"
                defaultValue="984, 230"
                onChange={(e) => handleChangeBalance(e.target.value)}
              />
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

      <Box className="setting-wallet-btns">
        <button onClick={() => handleUpdateBalance()}>Update Balance</button>

        {/* <button onClick={() => handleConnectWallet()}>
          Connect Antelope Wallet
        </button> */}
      </Box>
    </Box>
  );
};
