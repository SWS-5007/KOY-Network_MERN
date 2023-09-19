import React, { FC, useState, useEffect } from "react";

import { NewPassword } from "./NewPassword";
import { SuccessUpdatePwd } from "./SuccessUpdatePwd";

import "./styles.css";
import "./m.styles.css";

export const ResetPwdComponent: FC = () => {
  const [updatePwdStep, setUpdatePwdStep] = useState(0);

  return (
    <div className="repwd">
      <div className="overlap-wrapper">
        <div className="overlap">
          {updatePwdStep === 0 ? (
            <NewPassword setUpdatePwdStep={setUpdatePwdStep} />
          ) : updatePwdStep === 1 ? (
            <SuccessUpdatePwd />
          ) : (
            ""
          )}
          <div className="ellipse-5" />
        </div>
      </div>
    </div>
  );
};
