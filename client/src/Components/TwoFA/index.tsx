import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { ChooseProceeType } from "./ChooseProceeType";
import { PhoneNumber } from "./PhoneNumber";
import { VerifySMS } from "./VerifySMS";

import "./styles.css";
import "./m.styles.css";

export const TwoFAComponent: FC = () => {
  const [proceeType, setProceeType] = useState<string>("SMS");
  const [smsRequestId, setSMSRequestId] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);

  const handleProceeSMS = (type: string) => {
    setProceeType(type);
  };

  return (
    <div className="twofa">
      <div className="overlap-wrapper">
        <div className="overlap">
          {proceeType === "SMS" ? (
            <ChooseProceeType handleProceeSMS={handleProceeSMS} />
          ) : proceeType === "PN" ? (
            <PhoneNumber
              handleProceeSMS={handleProceeSMS}
              setSMSRequestId={setSMSRequestId}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
          ) : proceeType === "VS" ? (
            <VerifySMS
              handleProceeSMS={handleProceeSMS}
              smsRequestId={smsRequestId}
              setSMSRequestId={setSMSRequestId}
              phoneNumber={phoneNumber}
            />
          ) : (
            ""
          )}

          <div className="ellipse-5" />
        </div>
      </div>
    </div>
  );
};
