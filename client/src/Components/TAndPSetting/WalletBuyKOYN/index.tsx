import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { ethers, Signer } from "ethers";
import QRcode from "qrcode";
import EthereumQRPlugin from "ethereum-qr-code";

import { Box, Typography, Divider, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { QRCodeModal } from "./QRCodeModal";

import { setProfile, useAppDispatch } from "src/store";
import { saveNewTransaction } from "src/Api";

import "./styles.css";
import "./m.styles.css";

interface Props {
  metamaskAccounts: any;
  setMetamaskAccounts: Dispatch<SetStateAction<any | null>>;
  setWalletConnectStatus: Dispatch<SetStateAction<boolean>>;
  // handleRegister: () => void;
}

interface ErrorProps {
  value: boolean | string;
  errorMsg: string;
}

const usdtContractAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
const usdtContractAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const transferABI = [
  {
    name: "transfer",
    type: "function",
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        type: "uint256",
        name: "_tokens",
      },
    ],
    constant: false,
    outputs: [],
    payable: false,
  },
];

const DEPOSIT_ADDRESS = process.env.REACT_APP_DEPOSIT_ADDRESS;

export const WalletBuyKOYN: FC<Props> = ({
  metamaskAccounts,
  setMetamaskAccounts,
  setWalletConnectStatus,
}) => {
  const dispatch = useAppDispatch();
  const { ethereum } = window as any;
  const provider = new ethers.BrowserProvider(ethereum);

  const [qrCodeModalOpen, setQrCodeModalOpen] = useState(false);

  const [account, setAccount] = useState(
    metamaskAccounts ? metamaskAccounts[0] : ""
  );

  useEffect(() => {
    setAccount(metamaskAccounts ? metamaskAccounts[0] : "");
  }, [metamaskAccounts]);

  const [accountUSDTBalance, setAccountUSDTBalance] = useState(0);
  const [usdtAmount, setUsdtAmount] = useState("0");

  const getUSDTBalance = async () => {
    try {
      const signer: Signer = await provider.getSigner();

      const usdtContract = new ethers.Contract(
        usdtContractAddress,
        usdtContractAbi,
        signer
      );
      // // Get the user's ETH address
      // const userAddress = await signer.getAddress();
      // console.log("userAddress", userAddress);

      // Call the balanceOf function to get the balance
      const usdtBalance = await usdtContract.balanceOf(account);
      let bal = ethers.formatEther(usdtBalance);
      setAccountUSDTBalance(Number(bal));
    } catch (error: any) {
      console.log(error.message);
      console.log(
        "Please check if you imported the USDT Token on your wallet"!
      );
      setAccountUSDTBalance(0);
    }
  };

  useEffect(() => {
    getUSDTBalance();
  }, [account]);

  const handleChangeAccount = (event: SelectChangeEvent) => {
    setAccount(event.target.value as string);
  };

  const handleBuyKOYN = async () => {
    const signer: Signer = await provider.getSigner();
    // console.log("1111111111111111", signer, signer.getAddress());

    const newContract = new ethers.Contract(
      usdtContractAddress,
      transferABI,
      signer
    );

    const amount = ethers.parseUnits(usdtAmount, 18);
    const toAddress = DEPOSIT_ADDRESS;

    /////////////////Transfer Token/////////////////
    try {
      const tx = await newContract.transfer(toAddress, amount);
      console.log("Transaction hash:", tx.hash);

      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log("Transaction receipt:", receipt);

      if (receipt.status === 1) {
        console.log("Transfer successful!");
        try {
          // Save New Transaction History
          await saveNewTransaction({
            status: "completed",
            usdt_amount: usdtAmount,
            koyn_amount: usdtAmount,
            tx_number: tx.hash,
          });
        } catch (error: any) {
          console.error(error);
        }
      } else {
        console.error("Transfer failed. Status:", receipt.status);
      }
      // Open the Modal
      setQrCodeModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
    }

    // await newContract
    //   .transfer(DEPOSIT_ADDRESS, amount)
    //   .then((transferResult: any) => {
    //     console.log("transferResult", transferResult);
    //   })
    //   .catch((error: any) => {
    //     console.error("Error", error);
    //   });
    ///////////////////////////////////////////////

    ////////////////Generate QR Code////////////////
    // const qr = new EthereumQRPlugin();

    // const sendDetails = {
    //   to: DEPOSIT_ADDRESS,
    //   from: account,
    //   gas: 100000,
    //   mode: "erc20__transfer",
    //   argsDefaults: [
    //     {
    //       name: "to",
    //       value: DEPOSIT_ADDRESS,
    //     },
    //     {
    //       name: "value",
    //       value: 0,
    //     },
    //   ],
    // };

    // const sendDetails = {
    //   to: DEPOSIT_ADDRESS,
    //   value: 0,
    //   gas: 42000,
    // };

    // const configDetails = {
    //   size: 180,
    //   selector: "#qrcodemodal-ethereum-qr-code",
    //   options: {
    //     margin: 2,
    //   },
    // };

    // qr.toCanvas(sendDetails, configDetails)
    //   .then((qrCode: any) => {
    //     console.log("Your QR is generated!", qrCode);
    //   })
    //   .catch((err: any) => {
    //     console.log("Error", err);
    //   });

    // Generate QR Code Way_2
    // const canvas = document.getElementById("canvas");

    // QRcode.toDataURL("I am a pony!")
    //   .then((url) => {
    //     console.log(url);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  const handleDisconnect = async () => {
    setMetamaskAccounts(null);
    setWalletConnectStatus(false);
  };

  return (
    <Box className="tandp-list-content-walletbuy">
      <Box className="tandp-walletbuy-wrapper">
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
              Selected Account
            </Typography>

            <Box
              className="main_child_accountselect"
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
                {metamaskAccounts &&
                  metamaskAccounts.map((item: string, key: number) => (
                    <MenuItem key={key} value={item}>
                      {item}
                    </MenuItem>
                  ))}
              </Select>
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: "white", margin: "10px 0px" }} />

          <Box className="main_child child_2">
            <Typography variant="body1" className="main_child_title">
              USDT Balance
            </Typography>

            <Box
              sx={{
                width: "50%",
              }}
            >
              <input
                readOnly
                type="text"
                className="setting_input usdt_balance"
                defaultValue={accountUSDTBalance}
              />
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: "white", margin: "10px 0px" }} />

          <Box className="main_child child_2">
            <Typography variant="body1" className="main_child_title">
              USDT Amount
            </Typography>

            <Box
              sx={{
                width: "50%",
              }}
            >
              <input
                type="number"
                className="setting_input usdt_amount"
                defaultValue={usdtAmount}
                onChange={(e) => setUsdtAmount(e.target.value)}
              />
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: "white", margin: "10px 0px" }} />

          <Box className="main_child child_2">
            <Typography variant="body1" className="main_child_title">
              KOYN Amount
            </Typography>

            <Box
              sx={{
                width: "50%",
              }}
            >
              <input
                type="number"
                className="setting_input koyn_amount"
                defaultValue="5000"
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

      <Box className="tandp-walletbuy-btns">
        <button className="button" onClick={() => handleDisconnect()}>
          Disconnect Wallet
        </button>

        <button className="button" onClick={() => handleBuyKOYN()}>
          Buy KOYN
        </button>
      </Box>

      <QRCodeModal
        qrCodeModalOpen={qrCodeModalOpen}
        setQrCodeModalOpen={setQrCodeModalOpen}
      />
    </Box>
  );
};
