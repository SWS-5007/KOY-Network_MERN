import React, { FC, useState, useEffect } from "react";

import { ForgotPassword } from "./ForgotPassword";
import { ResetLink } from "./ResetLink";

import "./styles.css";
import "./m.styles.css";

export const RePwdRequestComponent: FC = () => {
  const [rePwdStep, setRePwdStep] = useState(0);
  const [resetEmail, setResetEmail] = useState("");

  return (
    <div className="repwdrequest">
      <div className="overlap-wrapper">
        <div className="overlap">
          {rePwdStep === 0 ? (
            <ForgotPassword
              setRePwdStep={setRePwdStep}
              resetEmail={resetEmail}
              setResetEmail={setResetEmail}
            />
          ) : rePwdStep === 1 ? (
            <ResetLink resetEmail={resetEmail} />
          ) : (
            ""
          )}
          <div className="ellipse-5" />
        </div>
      </div>
    </div>
  );
};
