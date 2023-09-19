import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import "./m.styles.css";

interface Props {}

interface ErrorProps {
  value: boolean | string;
  errorMsg: string;
}

export const SuccessUpdatePwd: FC<Props> = ({}) => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="SuccessUpdatePwd-card-container">
      <p className="text-1">Success!</p>

      <p className="text-2">
        Your password has been updated. <br />
        Ready to Log In?
      </p>

      <button className="go-login-btn" onClick={() => goToLogin()}>
        Login
      </button>
    </div>
  );
};
