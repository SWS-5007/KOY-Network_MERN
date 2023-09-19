import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";

import { isValidEmail } from "../../../hook/isValidEmail";

import "./styles.css";
import "./m.styles.css";

interface Props {
  setRePwdStep: Dispatch<SetStateAction<number>>;
  resetEmail: string;
  setResetEmail: Dispatch<SetStateAction<string>>;
}

interface ErrorProps {
  value: boolean | string;
  errorMsg: string;
}

const BASE_API = process.env.REACT_APP_BASE_API;

export const ForgotPassword: FC<Props> = ({
  setRePwdStep,
  resetEmail,
  setResetEmail,
}) => {
  const [error, setError] = useState<ErrorProps>({
    value: false,
    errorMsg: "",
  });

  const handleChangeResetEmail = (email: string) => {
    if (isValidEmail(email) || email === "") {
      setError({
        value: false,
        errorMsg: "",
      });

      setResetEmail(email);
    } else {
      setError({
        value: "email",
        errorMsg: "Invalid email address!",
      });
    }
  };

  const handleRePwdRequest = () => {
    axios({
      method: "POST",
      data: { resetEmail: resetEmail },
      withCredentials: true,
      url: BASE_API + "/api/resetpwdrequest",
    }).then((res) => {
      console.log("resetPwd_response", res);
      if (res.status === 200) {
        setRePwdStep(1);
      } else {
        console.error("Password reset error", res);
      }
    });
  };

  return (
    <div className="repwdrequest-card-container">
      <p className="text-1">Forgot password?</p>

      <p className="text-2">No worries! We've got you covered.</p>

      <div className="email-fields" style={{ marginTop: "8px" }}>
        <p className="text-3">Email</p>

        <div className="email">
          <input
            type="text"
            className="email-form"
            placeholder="Email address"
            defaultValue={resetEmail}
            onChange={(e) => handleChangeResetEmail(e.target.value)}
          />

          <p className={`errorMsg ${error.value === "email" ? "" : "none"}`}>
            {error.errorMsg}
          </p>
        </div>
      </div>

      <button className="send-resetbtn" onClick={() => handleRePwdRequest()}>
        Send Reset
      </button>
    </div>
  );
};
