import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { isValidPwd } from "../../../hook/isValidPwd";

import "./styles.css";
import "./m.styles.css";

interface Props {
  setUpdatePwdStep: Dispatch<SetStateAction<number>>;
}

interface isVaildPwdResultsProps {
  isLeast8: boolean;
  isIncludeNumber: boolean;
  isIncludeSpeical: boolean;
  isIncludeBothCases: boolean;
}

const BASE_API = process.env.REACT_APP_BASE_API;

export const NewPassword: FC<Props> = ({ setUpdatePwdStep }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPwd, setNewPwd] = useState("");

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

    if (
      isVaildPwdResults.isLeast8 &&
      isVaildPwdResults.isIncludeNumber &&
      isVaildPwdResults.isIncludeSpeical &&
      isVaildPwdResults.isIncludeBothCases
    ) {
      setNewPwd(e.target.value);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const param = useParams();

  const updateNewPwd = async () => {
    try {
      axios({
        method: "POST",
        data: { newPwd: newPwd, userId: param.id },
        withCredentials: true,
        url: BASE_API + "/api/updatepwd",
      }).then((res) => {
        console.log("updatePwd_response", res);
        if (res.status === 200) {
          setUpdatePwdStep(1);
        } else {
          console.error("Password Update error", res);
        }
      });
    } catch (error) {
      console.log("updateNewPwd Error", error);
    }
  };

  return (
    <div className="repwd-card-container">
      <p className="text-1">Forge a new password</p>

      <p className="text-2">
        Blend in letters, numbers, and symbols for a robust password.
      </p>

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

      <button className="save-new-pwd-btn" onClick={() => updateNewPwd()}>
        Save Password
      </button>
    </div>
  );
};
