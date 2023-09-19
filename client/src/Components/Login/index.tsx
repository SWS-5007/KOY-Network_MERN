import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link as ReactRouteLink } from "react-router-dom";

import axios from "axios";

import { Box } from "@mui/material";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import {
  setProfile,
  setSignUpModal,
  setSignInModal,
  useAppDispatch,
  useAppSelector,
} from "src/store";

import { getProfileApi } from "src/Api";
import { isValidEmail } from "src/hook/isValidEmail";
import { isMobileDevice } from "src/hook/isMobileDevice";
import { NavigateLogin } from "src/hook/NavigateLogin";
import { isValidPwd } from "src/hook/isValidPwd";

import "./m.styles.css";

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

export const LoginComponent: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginUserData, setLoginUserData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState<ErrorProps>({
    value: false,
    errorMsg: "",
  });

  const [pwdError, setPwdError] = useState<ErrorProps>({
    value: false,
    errorMsg: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChangeEmail = (email: string) => {
    if (isValidEmail(email) || email === "") {
      setEmailError({
        value: false,
        errorMsg: "",
      });

      setLoginUserData({
        ...loginUserData,
        ["email"]: email,
      });
    } else {
      setEmailError({
        value: "email",
        errorMsg: "Invalid email address!",
      });
    }
  };

  const [isVaildPwdResults, setIsValidPwdResults] =
    useState<isVaildPwdResultsProps>({
      isLeast8: false,
      isIncludeNumber: false,
      isIncludeSpeical: false,
      isIncludeBothCases: false,
    });

  const [password, setPassword] = useState("");

  const handleChangePassword = (e: any) => {
    const isVaildPwdResults = isValidPwd(e.target.value);
    setIsValidPwdResults(isVaildPwdResults);

    setPassword(e.target.value);
    if (
      (isVaildPwdResults.isLeast8 &&
        isVaildPwdResults.isIncludeNumber &&
        isVaildPwdResults.isIncludeSpeical &&
        isVaildPwdResults.isIncludeBothCases) ||
      e.target.value === ""
    ) {
      setLoginUserData({
        ...loginUserData,
        ["password"]: e.target.value,
      });

      setPwdError({
        value: "",
        errorMsg: "",
      });
    } else {
      setPwdError({
        value: "password",
        errorMsg:
          "Password must be at least 8 characters long, contain at least one number, one uppercase letter, and one special character",
      });
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    axios({
      method: "POST",
      data: loginUserData,
      withCredentials: true,
      url: BASE_API + "/api/login",
    })
      .then(async (res) => {
        if (res.status === 201) {
          //Save the token on local storage
          const login_jwt_token = res.data.login_jwt_token;
          localStorage.setItem("login_jwt_token", login_jwt_token);

          try {
            const getProfile = await getProfileApi();
            dispatch(setProfile(getProfile.data.user));

            // Navigate after Login
            const isMobile = isMobileDevice();
            if (isMobile === false) {
              dispatch(setSignInModal(false));
              dispatch(setSignUpModal(false));
            }

            if (getProfile.data.user.sms_verified === true) {
              navigate("/");
            } else {
              navigate("/twofa");
            }
          } catch (error: any) {
            console.error(error);
            if (error.response.status === 405) {
              navigate("/login");
            }
          }
        }
      })
      .catch((error) => {
        console.error(error);
        alert(error.response.data.message);
      });
  };

  const handleGoToSignUp = () => {
    const isMobile = isMobileDevice();
    if (isMobile === true) {
      navigate("/joinKoy");
    } else {
      dispatch(setSignInModal(false));
      dispatch(setSignUpModal(true));
    }
  };

  return (
    <Box className="login">
      <Box className="overlap-wrapper">
        <Box className="overlap">
          <Box className="login-card-container">
            <p className="text-1">Login</p>

            <p className="text-2">Great to see you again!</p>

            <Box className="email-fields" sx={{ marginTop: "40px" }}>
              <p className="text-3">Email</p>

              <Box className="email">
                <input
                  type="text"
                  className="email-form"
                  placeholder="Email address"
                  defaultValue={loginUserData.email}
                  onChange={(e) => handleChangeEmail(e.target.value)}
                />

                <p
                  className={`errorMsg ${
                    emailError.value === "email" ? "" : "none"
                  }`}
                >
                  {emailError.errorMsg}
                </p>
              </Box>
            </Box>

            <Box className="password-fields" sx={{ marginTop: "12px" }}>
              <p className="text-3">Password</p>

              <Box className="password">
                <input
                  className="password-form"
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

              <p
                className={`errorMsg ${
                  pwdError.value === "password" ? "" : "none"
                }`}
              >
                {pwdError.errorMsg}
              </p>
            </Box>

            <button className="joinkeybtn" onClick={() => handleLogin()}>
              Login
            </button>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "27px" }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "1px",
                  borderTop: "1px solid rgba(0, 0, 0, 0.11)",
                }}
              ></Box>

              <span className="orSpan">or</span>

              <Box
                sx={{
                  width: "100%",
                  height: "1px",
                  borderTop: "1px solid rgba(0, 0, 0, 0.11)",
                }}
              ></Box>
            </Box>

            <button className="loginpasskeybtn">
              <svg width="23" height="10" viewBox="0 0 23 10" fill="none" className="lock-icon">
                <path
                  d="M5.06624 0C7.34238 0 9.32482 1.52174 9.91221 3.69565H21.7334C23.4222 3.69565 23.4222 6.23188 21.7334 6.23188H20.9992V8.47826C20.9992 9.78261 18.9433 9.78261 18.9433 8.47826V6.23188H18.2825V7.89855C18.2825 9.27536 16.2267 9.27536 16.2267 7.89855V6.23188H9.91221C9.39824 8.4058 7.34238 10 5.06624 10C2.27614 10 0 7.75362 0 5C0 2.24638 2.27614 0 5.06624 0ZM5.06624 2.53623C3.67119 2.53623 2.56983 3.62319 2.56983 5C2.56983 6.37681 3.67119 7.46377 5.06624 7.46377C6.46129 7.46377 7.56265 6.37681 7.56265 5C7.56265 3.62319 6.46129 2.53623 5.06624 2.53623Z"
                  fill="white"
                />
              </svg>
              Login with Passkey
            </button>

            <p className="already-on-KOY-log" style={{ marginTop: "20px" }}>
              <span className="already-on-KOY-text">Need an account? </span>

              <span className="log-In-text" onClick={() => handleGoToSignUp()}>
                Join KOY
              </span>
            </p>

            <p className="by-registering-you">
              <span className="by-registering-you-text">
                Forgot your password?
              </span>
              <ReactRouteLink
                to="/repwdrequest"
                style={{
                  textDecoration: "none",
                }}
              >
                <span className="terms-of-service-text">Get a reset link</span>
              </ReactRouteLink>
            </p>
          </Box>
          <Box className="ellipse-5" />
        </Box>
      </Box>
    </Box>
  );
};
