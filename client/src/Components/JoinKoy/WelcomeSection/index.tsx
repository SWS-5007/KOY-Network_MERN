import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

import { useNavigate } from "react-router-dom";
import { NewUserDataType } from "src/Types";

import "./styles.css";
import "./m.styles.css";

interface Props {
  newUserData: NewUserDataType;
}

interface ErrorProps {
  value: boolean | string;
  errorMsg: string;
}

export const WelcomeSection: FC<Props> = ({ newUserData }) => {
  return (
    <div className="welcome-card-container">
      <p className="text-1">Welcome to the KOY Community!</p>

      <p className="text-2">
        We've dispatched a confirmation link to
        <span className="gmail-span">{newUserData.email}</span>. Kindly check
        your inbox, and click the link to activate your account.
        <br />
        <br />
        Dive into the new era of digital connections!
      </p>

      <button className="resendEmailBtn">Resend Email</button>
    </div>
  );
};
