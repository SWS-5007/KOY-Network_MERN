import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import EthereumQRPlugin from "ethereum-qr-code";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import "./styles.css";
import "./m.styles.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "none",
  borderRadius: "10px",
  background: "#FFF",
  boxShadow: 24,
  padding: "40px 28px",
};

interface Props {
  qrCodeModalOpen: boolean;
  setQrCodeModalOpen: Dispatch<SetStateAction<boolean>>;
}

const DEPOSIT_ADDRESS = process.env.REACT_APP_DEPOSIT_ADDRESS;

export const QRCodeModal: FC<Props> = ({
  qrCodeModalOpen,
  setQrCodeModalOpen,
}) => {
  const handleClose = () => setQrCodeModalOpen(false);

  const generateQrCode = () => {
    const qr = new EthereumQRPlugin();

    const sendDetails = {
      // to: "0x747f3C1fecDCD12CA85a0ec9870e822ae9ccd200",
      to: DEPOSIT_ADDRESS,
      value: 0,
      gas: 42000,
    };

    const configDetails = {
      size: 180,
      selector: "#qrcodemodal-ethereum-qr-code",
      options: {
        margin: 2,
      },
    };

    qr.toCanvas(sendDetails, configDetails)
      .then((qrCode: any) => {
        console.log("Your QR is generated!", qrCode);
      })
      .catch((err: any) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    if (qrCodeModalOpen === true) {
      const qrCodeElement = document.getElementById(
        "qrcodemodal-ethereum-qr-code"
      );

      const intervalFunc = setInterval(() => {
        generateQrCode();

        if (!qrCodeElement) {
          clearInterval(intervalFunc);
        }
      }, 1000);
    }
  }, [qrCodeModalOpen]);

  return (
    <>
      <Modal
        className="qrmodal-wrapper"
        open={qrCodeModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="qrmodal-container" sx={style}>
          <Typography
            id="modal-modal-title"
            className="qrmodal-title"
            variant="body1"
          >
            Send USDT
          </Typography>

          <Typography
            id="modal-modal-description"
            className="qrmodal-description"
            variant="body1"
          >
            Send 5000 USDT to this Etherum address and we will send you{" "}
            <span className="span-text-1">5000 KOYN</span>
            to <span className="span-text-2">1mlr.user</span>
          </Typography>

          <div
            id="qrcodemodal-ethereum-qr-code"
            className="qrcodemodal-qrcode"
          ></div>

          <Typography className="qrmodal-wallet-address" variant="body1">
            0x71C7656EC7ab88b098defB751B7401B5f6d897
          </Typography>

          <Typography className="qrmodal-wallet-address-des" variant="body1">
            This address is on the Etherum network
          </Typography>

          <button className="copy-btn">Copy Address</button>

          <button className="track-btn">Track Progress</button>
        </Box>
      </Modal>
    </>
  );
};
