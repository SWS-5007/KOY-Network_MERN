import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import {
  getSignInUpModalState,
  setSignInModal,
  setSignUpModal,
  useAppDispatch,
  useAppSelector,
} from "src/store";

import { isMobileDevice } from "src/hook/isMobileDevice";
import { isValidEmail } from "../../../hook/isValidEmail";
import { isValidPwd } from "../../../hook/isValidPwd";

import { NewUserDataType } from "src/Types";

import "./styles.css";
import "./m.styles.css";

interface Props {
  setJoinKoyStep: Dispatch<SetStateAction<number>>;
  newUserData: NewUserDataType;
  setNewUserData: Dispatch<SetStateAction<NewUserDataType>>;
}

interface isVaildPwdResultsProps {
  isLeast8: boolean;
  isIncludeNumber: boolean;
  isIncludeSpeical: boolean;
  isIncludeBothCases: boolean;
}

interface ErrorProps {
  value: boolean | string;
  errorMsg: string;
}

export const UserInfoSection: FC<Props> = ({
  setJoinKoyStep,
  newUserData,
  setNewUserData,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const [isVaildPwdResults, setIsValidPwdResults] =
    useState<isVaildPwdResultsProps>({
      isLeast8: false,
      isIncludeNumber: false,
      isIncludeSpeical: false,
      isIncludeBothCases: false,
    });

  const [error, setError] = useState<ErrorProps>({
    value: false,
    errorMsg: "",
  });

  const handleChangeName = (key: string, value: string) => {
    setNewUserData({
      ...newUserData,
      [key]: value,
    });
  };

  const handleChangeEmail = (email: string) => {
    if (isValidEmail(email) || email === "") {
      setError({
        value: false,
        errorMsg: "",
      });

      setNewUserData({
        ...newUserData,
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
    const isVaildPwdResults = isValidPwd(e.target.value);
    setIsValidPwdResults(isVaildPwdResults);

    setPassword(e.target.value);

    setNewUserData({
      ...newUserData,
      ["password"]: e.target.value,
    });

    // if (
    //   isVaildPwdResults.isLeast8 &&
    //   isVaildPwdResults.isIncludeNumber &&
    //   isVaildPwdResults.isIncludeSpeical &&
    //   isVaildPwdResults.isIncludeBothCases
    // ) {
    //   setNewUserData({
    //     ...newUserData,
    //     ["password"]: e.target.value,
    //   });
    // }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleGoToLogin = () => {
    const isMobile = isMobileDevice();
    if (isMobile === true) {
      navigate("/login");
    } else {
      dispatch(setSignInModal(true));
      dispatch(setSignUpModal(false));
    }
  };

  const handleGoToTermsOfService = () => {
    navigate("/policies");
  };

  return (
    <div className="userinfo-card-container">
      <p className="text-1">Join KOY: The Future of Digital Connectivity</p>

      <p className="text-2">
        Empowering smartphone apps across Africa and its global diaspora with a
        robust distributed ledger system.
      </p>

      <div className="card-name-fields" style={{ marginTop: "10px" }}>
        <p className="text-3">Name</p>

        <div className="firstlastname">
          <input
            type="text"
            className="firstname-form"
            placeholder="First Name"
            onChange={(e) => handleChangeName("firstname", e.target.value)}
          />

          <input
            type="text"
            className="lastname-form"
            placeholder="Last Name"
            onChange={(e) => handleChangeName("lastname", e.target.value)}
          />
        </div>
      </div>

      <div className="email-fields" style={{ marginTop: "8px" }}>
        <p className="text-3">Email</p>

        <div className="email">
          <input
            type="text"
            className="email-form"
            placeholder="Email address"
            defaultValue={newUserData.email}
            onChange={(e) => handleChangeEmail(e.target.value)}
          />

          <p className={`errorMsg ${error.value === "email" ? "" : "none"}`}>
            {error.errorMsg}
          </p>
        </div>
      </div>

      <div className="password-fields" style={{ marginTop: "12px" }}>
        <p className="text-3">Password</p>

        <div className="password">
          <input
            className="password-form"
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Password"
            onChange={(e) => handleChangePassword(e)}
          />

          <span className="password-toggle" onClick={handlePasswordToggle}>
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        </div>

        <div className="pwd-check-wrapper">
          <div className="at-least-status element_2">
            <div
              className={`pwd-check-element ${
                isVaildPwdResults.isLeast8 ? "green-status" : "black-status"
              }`}
            ></div>
            <p className="text-4">At least 8 characters long</p>
          </div>

          <div className="include-number element_2">
            <div
              className={`pwd-check-element ${
                isVaildPwdResults.isIncludeNumber
                  ? "green-status"
                  : "black-status"
              }`}
            ></div>
            <p className="text-4">Include a number</p>
          </div>

          <div className="include-speical element_2">
            <div
              className={`pwd-check-element ${
                isVaildPwdResults.isIncludeSpeical
                  ? "green-status"
                  : "black-status"
              }`}
            ></div>
            <p className="text-4">Include a special character</p>
          </div>

          <div className="include-both-case-letters element_2">
            <div
              className={`pwd-check-element ${
                isVaildPwdResults.isIncludeBothCases
                  ? "green-status"
                  : "black-status"
              }`}
            ></div>
            <p className="text-4">Include both case letters</p>
          </div>
        </div>
      </div>

      <button className="joinkeybtn" onClick={() => setJoinKoyStep(1)}>
        Join KOY
      </button>

      <p className="already-on-KOY-log" style={{ marginTop: "20px" }}>
        <span className="already-on-KOY-text">Already on KOY? </span>
        <span className="log-In-text" onClick={() => handleGoToLogin()}>
          Log In
        </span>
      </p>

      <p className="by-registering-you">
        <span className="by-registering-you-text">
          By registering, you agree to our&nbsp;
        </span>
        <span
          className="terms-of-service-text"
          onClick={() => handleGoToTermsOfService()}
        >
          Terms of Service.
        </span>
      </p>
    </div>
  );
};
