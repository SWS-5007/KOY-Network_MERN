import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

import "./styles.css";
import "./m.styles.css";

interface Props {
  resetEmail: any;
}

interface ErrorProps {
  value: boolean | string;
  errorMsg: string;
}

export const ResetLink: FC<Props> = ({ resetEmail }) => {
  return (
    <div className="resetlink-card-container">
      <p className="text-1">Reset Link Dispatched!</p>

      <p className="text-2">
        Head to <span className="reset-email-span">{resetEmail}</span> and
        follow the link to update your password.
      </p>
    </div>
  );
};
