import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";
import { Link as ReactRouteLink } from "react-router-dom";

import axios from "axios";

import { Box, Modal } from "@mui/material";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { AppDispatch, setProfile } from "src/store";
import {
  getSignInUpModalState,
  setSignUpModal,
  setSignInModal,
  useAppDispatch,
  useAppSelector,
} from "src/store";

import { getProfileApi } from "src/Api";
import { isValidEmail } from "src/hook/isValidEmail";
import { isMobileDevice } from "src/hook/isMobileDevice";
import { NavigateLogin } from "src/hook/NavigateLogin";

import "./loginModal.styles.css";

interface Props {}

interface ErrorProps {
  value: boolean | string;
  errorMsg: string;
}

const BASE_API = process.env.REACT_APP_BASE_API;

export const LoginModal: FC<Props> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { signInModal } = useAppSelector(getSignInUpModalState);

  const [loginUserData, setLoginUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<ErrorProps>({
    value: false,
    errorMsg: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChangeEmail = (email: string) => {
    if (isValidEmail(email) || email === "") {
      setError({
        value: false,
        errorMsg: "",
      });

      setLoginUserData({
        ...loginUserData,
        ["email"]: email,
      });
    } else {
      setError({
        value: "email",
        errorMsg: "Invalid email address!",
      });
    }
  };

  const handleChangePassword = (e: any) => {
    setLoginUserData({
      ...loginUserData,
      ["password"]: e.target.value,
    });
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

  const handleClose = () => dispatch(setSignInModal(false));

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
    <Modal
      className="loginmodal-wrapper"
      open={signInModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
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

            <p className={`errorMsg ${error.value === "email" ? "" : "none"}`}>
              {error.errorMsg}
            </p>
          </Box>
        </Box>

        <Box className="password-fields" sx={{ marginTop: "12px" }}>
          <p className="text-3">Password</p>

          <Box className="password">
            <input
              className="password-form"
              type={showPassword ? "text" : "password"}
              value={loginUserData.password}
              placeholder="Password"
              onChange={(e) => handleChangePassword(e)}
            />

            <span className="password-toggle" onClick={handlePasswordToggle}>
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </Box>
        </Box>

        <button className="joinkeybtn" onClick={() => handleLogin()}>
          Login
        </button>

        <p className="already-on-KOY-log" style={{ marginTop: "20px" }}>
          <span className="already-on-KOY-text">Need an account? </span>

          <span className="log-In-text" onClick={() => handleGoToSignUp()}>
            Join KOY
          </span>
        </p>

        <p className="by-registering-you">
          <span className="by-registering-you-text">Forgot your password?</span>
          <ReactRouteLink
            to="/repwdrequest"
            style={{
              textDecoration: "none",
            }}
          >
            <span className="terms-of-service-text">
              &nbsp;Get a reset link
            </span>
          </ReactRouteLink>
        </p>
      </Box>
    </Modal>
  );
};
