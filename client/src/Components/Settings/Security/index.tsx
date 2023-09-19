import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";

import { Box, Typography, Divider, IconButton } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { CountryAutocomplete } from "../../MuiComponents/CountryAutocomplete";
import { getKeyCreatedDate } from "src/hook/getKeyCreatedDate";
import { isValidPwd } from "src/hook/isValidPwd";
import {
  setProfile,
  getPassKeysState,
  useAppDispatch,
  useAppSelector,
} from "src/store";

import "./styles.css";
import "./m.styles.css";

interface Props {
  currentUserData: any;
  setCurrentUserData: Dispatch<SetStateAction<any>>;
  setSettingSubPage: Dispatch<SetStateAction<string>>;
  // handleRegister: () => void;
}

interface ErrorProps {
  value: boolean | string;
  errorMsg: string;
}

interface isVaildPwdResultsProps {
  isLeast8: boolean;
  isIncludeNumber: boolean;
  isIncludeSpeical: boolean;
  isIncludeBothCases: boolean;
}

const BASE_API = process.env.REACT_APP_BASE_API;

export const Security: FC<Props> = ({
  currentUserData,
  setCurrentUserData,
  setSettingSubPage,
}) => {
  const dispatch = useAppDispatch();
  const { passKeys } = useAppSelector(getPassKeysState);

  const [userPassKeys, setUserPassKeys] = useState<any | null>(null);

  useEffect(() => {
    if (passKeys) {
      setUserPassKeys(passKeys);
    } else {
      setUserPassKeys(null);
    }
  }, [passKeys]);

  const [NewUserData, setNewUserData] = useState<any | null>(null);

  useEffect(() => {
    setNewUserData(currentUserData);
  }, [currentUserData]);

  const [twoFAMethod, setTwoFAMethod] = useState("Passkeys");
  const handleChange2FAMethod = (event: SelectChangeEvent) => {
    setTwoFAMethod(event.target.value as string);
  };

  const handleAddPassKey = () => {
    setSettingSubPage("keymanage");
  };

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const [password, setPassword] = useState("");

  const [isVaildPwdResults, setIsValidPwdResults] =
    useState<isVaildPwdResultsProps>({
      isLeast8: false,
      isIncludeNumber: false,
      isIncludeSpeical: false,
      isIncludeBothCases: false,
    });

  const handleChangePassword = (e: any) => {
    const isVaildPwdResults = isValidPwd(e.target.value);
    setIsValidPwdResults(isVaildPwdResults);

    setPassword(e.target.value);
  };

  const handleSave = async () => {
    if (
      isVaildPwdResults.isLeast8 &&
      isVaildPwdResults.isIncludeNumber &&
      isVaildPwdResults.isIncludeSpeical &&
      isVaildPwdResults.isIncludeBothCases
    ) {
      try {
        axios({
          method: "POST",
          data: { newPwd: password, userId: currentUserData._id },
          withCredentials: true,
          url: BASE_API + "/api/updatepwd",
        }).then((res) => {
          console.log("updatePwd_response", res);
          if (res.status === 200) {
            console.log("Updated Password Success!");
          } else {
            console.error("Password Update error", res);
          }
        });
      } catch (error) {
        console.log("updateNewPwd Error", error);
      }
    } else {
      alert("New Password is not available yet!");
      return;
    }
  };

  const handleCancel = () => {
    setPassword("");
  };

  return (
    <Box className="setting-list-content-security">
      <Box className="setting-security-wrapper">
        <Box className="content-title">
          <Typography variant="body1" className="content-title-1">
            Security Preferences
          </Typography>

          <Typography variant="body1" className="content-title-2">
            Customized Protection for Your Peace of Mind
          </Typography>
        </Box>

        <Box className="content-main">
          <Box className="main_child child_1">
            <Typography variant="body1" className="main_child_title">
              2FA Method
            </Typography>

            <Box
              className="main_child_2fa"
              sx={{
                width: "50%",
              }}
            >
              <Select
                value={twoFAMethod}
                onChange={handleChange2FAMethod}
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
                <MenuItem value={"Passkeys"}>Passkeys</MenuItem>
                <MenuItem value={"SMS"}>SMS</MenuItem>
              </Select>
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: "white", margin: "10px 0px" }} />

          <Box
            className="main_child child_2"
            sx={{ alignItems: "flex-start !important" }}
          >
            <Typography variant="body1" className="main_child_title">
              Passkeys
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "13px",
                width: "50%",
              }}
            >
              {userPassKeys &&
                userPassKeys.map((item: any, key: number) => (
                  <Box className="every-passkey" key={key}>
                    <svg width="23" height="10" viewBox="0 0 23 10" fill="none">
                      <path
                        d="M5.06624 0C7.34238 0 9.32482 1.52174 9.91221 3.69565H21.7334C23.4222 3.69565 23.4222 6.23188 21.7334 6.23188H20.9992V8.47826C20.9992 9.78261 18.9433 9.78261 18.9433 8.47826V6.23188H18.2825V7.89855C18.2825 9.27536 16.2267 9.27536 16.2267 7.89855V6.23188H9.91221C9.39824 8.4058 7.34238 10 5.06624 10C2.27614 10 0 7.75362 0 5C0 2.24638 2.27614 0 5.06624 0ZM5.06624 2.53623C3.67119 2.53623 2.56983 3.62319 2.56983 5C2.56983 6.37681 3.67119 7.46377 5.06624 7.46377C6.46129 7.46377 7.56265 6.37681 7.56265 5C7.56265 3.62319 6.46129 2.53623 5.06624 2.53623Z"
                        fill="#8C8C8C"
                      />
                    </svg>

                    <Typography variant="body1" className="text-1">
                      {getKeyCreatedDate(item.createdAt.toString())}
                    </Typography>

                    <IconButton className="every-passkey-delbtn">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path
                          d="M1.67041 0.150195L3.99974 2.47937L6.3293 0.149953C6.52925 -0.0499843 6.85351 -0.0499843 7.05346 0.149953L7.84999 0.946555C8.05006 1.14661 8.04994 1.4706 7.84999 1.67066L5.52054 3.99995L7.84999 6.32925C8.05006 6.52919 8.04982 6.85342 7.84999 7.05323L7.05358 7.84959C6.85351 8.04953 6.52925 8.04965 6.32942 7.84972L3.99986 5.52054L1.67053 7.84996C1.47046 8.05002 1.14645 8.05002 0.946497 7.84996L0.149963 7.05347C-0.0499878 6.85366 -0.0499878 6.52931 0.149963 6.32949L2.47929 4.00008L0.149963 1.6709C-0.0501089 1.47085 -0.0498667 1.14661 0.149963 0.946797L0.946497 0.150316C1.14633 -0.0498633 1.47058 -0.0497422 1.67041 0.150195Z"
                          fill="#9FA4AA"
                        />
                      </svg>
                    </IconButton>
                  </Box>
                ))}

              <button className="button" onClick={() => handleAddPassKey()}>
                Add a passkey
              </button>
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: "white", margin: "10px 0px" }} />

          <Box
            className="main_child child_2"
            sx={{ alignItems: "flex-start !important" }}
          >
            <Typography variant="body1" className="main_child_title">
              New Password
            </Typography>

            <Box
              sx={{
                width: "50%",
              }}
            >
              <Box className="password-fields" sx={{ marginTop: "12px" }}>
                <Box className="password">
                  <input
                    className="setting_input"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="Password"
                    onChange={(e) => handleChangePassword(e)}
                  />

                  <span
                    className="password-toggle"
                    onClick={handlePasswordToggle}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </span>
                </Box>

                <Box className="pwd-check-wrapper">
                  <Box className="at-least-status element_2">
                    <Box
                      className={`pwd-check-element ${
                        isVaildPwdResults.isLeast8
                          ? "green-status"
                          : "white-status"
                      }`}
                    ></Box>
                    <p className="text-4">At least 8 characters long</p>
                  </Box>

                  <Box className="include-number element_2">
                    <Box
                      className={`pwd-check-element ${
                        isVaildPwdResults.isIncludeNumber
                          ? "green-status"
                          : "white-status"
                      }`}
                    ></Box>
                    <p className="text-4">Include a number</p>
                  </Box>

                  <Box className="include-speical element_2">
                    <Box
                      className={`pwd-check-element ${
                        isVaildPwdResults.isIncludeSpeical
                          ? "green-status"
                          : "white-status"
                      }`}
                    ></Box>
                    <p className="text-4">Include a special character</p>
                  </Box>

                  <Box className="include-both-case-letters element_2">
                    <Box
                      className={`pwd-check-element ${
                        isVaildPwdResults.isIncludeBothCases
                          ? "green-status"
                          : "white-status"
                      }`}
                    ></Box>
                    <p className="text-4">Include both case letters</p>
                  </Box>
                </Box>
              </Box>
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

      <Box className="setting-security-btns">
        <button className="button" onClick={() => handleCancel()}>
          Cancel
        </button>

        <button className="button" onClick={() => handleSave()}>
          Save
        </button>
      </Box>
    </Box>
  );
};
