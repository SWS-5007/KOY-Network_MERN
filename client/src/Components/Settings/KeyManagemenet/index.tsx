import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  ComponentType,
} from "react";
import axios from "axios";

import {
  Box,
  Checkbox,
  Typography,
  Divider,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import { MuiToast } from "src/Components/MuiComponents/Toast";

import { setUserPassKeys, useAppDispatch } from "src/store";
import generateRandomString from "src/hook/RandomString";
import { getUserKeys, saveNewKeys } from "src/Api";
import "./styles.css";
import "./m.styles.css";

interface Props {}

interface ErrorProps {
  value: boolean | string;
  errorMsg: string;
}

type TransitionProps = Omit<SlideProps, "direction">;

export const KeyManagemenet: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const [newPublicKey, setNewPublicKey] = useState<string>("");
  const [newPrivateKey, setNewPrivateKey] = useState<string>("");
  const [understandStatus, setUnderstandStatus] = useState<boolean>(true);
  const [storageStatus, setStorageStatus] = useState<boolean>(true);

  useEffect(() => {
    setNewPublicKey(generateRandomString(16));
    setNewPrivateKey(generateRandomString(16));
  }, []);

  const [error, setError] = useState<ErrorProps>({
    value: false,
    errorMsg: "",
  });

  const handleRegenerateKeys = () => {
    const newPublicKey = generateRandomString(16);
    setNewPublicKey(newPublicKey);
    const newPrivateKey = generateRandomString(16);
    setNewPrivateKey(newPrivateKey);
  };

  const handleUnderstandCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setUnderstandStatus(event.target.checked);
  };

  const handleStorageCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setStorageStatus(event.target.checked);
  };

  const handleSaveNewKeys = async () => {
    const data = {
      newPublicKey: newPublicKey,
      newPrivateKey: newPrivateKey,
      understandStatus: understandStatus,
      storageStatus: storageStatus,
    };

    await saveNewKeys(data)
      .then(async (res) => {
        if (res.status === 201) {
          const userKeys = await getUserKeys();
          dispatch(setUserPassKeys(userKeys.data.keys));
        }
      })
      .catch((err) => {
        console.log("SaveNewKeys Error", err);
      });
  };

  const [openToast, setOpenToast] = useState(false);

  const handleCopyText = async (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      const copyText =
        element instanceof HTMLInputElement
          ? element.value
          : element.textContent ?? "";

      try {
        await navigator.clipboard.writeText(copyText);
        console.log("Text copied to clipboard:", copyText);
        setOpenToast(true);
      } catch (error) {
        setOpenToast(false);
        console.error("Error copying text to clipboard:", error);
      }
    }
  };

  return (
    <Box className="setting-list-content-keymanage">
      <Box className="setting-keymanage-wrapper">
        <Box className="content-title">
          <Typography variant="body1" className="content-title-1">
            Key Management
          </Typography>

          <Typography variant="body1" className="content-title-2">
            <span>
              Consolidated. Controlled. <br />
            </span>
            Cryptographically Secure.
          </Typography>
        </Box>

        <Box className="content-main">
          <Box className="main_child child_1">
            <Typography variant="body1" className="main_child_title">
              Public Key
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                position: "relative",
                width: "50%",
              }}
            >
              <input
                readOnly
                type="text"
                id="public_key"
                className="setting_input public_key"
                value={newPublicKey}
              />

              <IconButton
                aria-label="copy"
                className="copyIconBtn"
                onClick={() => handleCopyText("public_key")}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M10.3784 4.62524V0H0V10.3748H4.62204V15H15V4.62524H10.3784ZM1.91757 8.45771V1.91711H8.46085V4.62524H4.62204V8.45768L1.91757 8.45771ZM13.0824 13.0829H6.54006V6.54238H13.0824V13.0829Z"
                    fill="#8C8C8C"
                  />
                </svg>
              </IconButton>
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: "white", margin: "10px 0px" }} />

          <Box className="main_child child_1">
            <Typography variant="body1" className="main_child_title">
              Private Key
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                position: "relative",
                width: "50%",
              }}
            >
              <input
                readOnly
                type="password"
                id="private_key"
                className="setting_input private_key"
                value={newPrivateKey}
              />

              <IconButton
                aria-label="copy"
                className="copyIconBtn"
                onClick={() => handleCopyText("private_key")}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M10.3784 4.62524V0H0V10.3748H4.62204V15H15V4.62524H10.3784ZM1.91757 8.45771V1.91711H8.46085V4.62524H4.62204V8.45768L1.91757 8.45771ZM13.0824 13.0829H6.54006V6.54238H13.0824V13.0829Z"
                    fill="#8C8C8C"
                  />
                </svg>
              </IconButton>
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: "white", margin: "10px 0px" }} />

          <Box
            className="main_child child_1"
            sx={{ alignItems: "flex-start !important" }}
          >
            <Typography variant="body1" className="main_child_title">
              Understanding
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "30px",
                width: "50%",
              }}
            >
              <Typography variant="body1" className="main_child_text">
                Copy your account’s private key in a safe place, they control
                access to your account. If another person discovers your
                accounts private key, they may access your account and steal
                your funds. If you lose your private key, you will have to go
                through a recovery process with KOY Network to restore them.
              </Typography>

              <FormControlLabel
                className="checkbox"
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleUnderstandCheckbox(event)
                    }
                  />
                }
                label="I understand"
              />
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: "white", margin: "10px 0px" }} />

          <Box className="main_child child_1">
            <Typography variant="body1" className="main_child_title">
              Storage
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "50%",
              }}
            >
              <FormControlLabel
                className="checkbox"
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleStorageCheckbox(event)
                    }
                  />
                }
                label="I have stored my private key in a safe place"
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

      <Box className="setting-keymanage-btns">
        <button onClick={() => handleRegenerateKeys()}>Regenerate Keys</button>

        <button onClick={() => handleSaveNewKeys()}>Save</button>
      </Box>

      {openToast === true ? (
        <MuiToast
          openToast={openToast}
          setOpenToast={setOpenToast}
          direction="right"
          message="Text copied!"
        />
      ) : (
        ""
      )}
    </Box>
  );
};
