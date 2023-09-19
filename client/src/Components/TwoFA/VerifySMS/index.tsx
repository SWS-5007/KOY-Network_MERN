import React, { FC, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ReactCodeInput from "react-verification-code-input";

import "./styles.css";
import "./m.styles.css";

const BASE_API = process.env.REACT_APP_BASE_API;

interface Props {
  smsRequestId: string;
  handleProceeSMS: (type: string) => void;
  setSMSRequestId: (type: string) => void;
  phoneNumber: string | undefined;
}

export const VerifySMS: FC<Props> = ({
  handleProceeSMS,
  smsRequestId,
  setSMSRequestId,
  phoneNumber,
}) => {
  const navigate = useNavigate();

  const [code, setCode] = useState("");

  const handleChangeCode = (value: string) => {
    setCode(value);
  };

  const handleVerifySMS = () => {
    axios({
      method: "POST",
      data: { code: code, requestId: smsRequestId },
      withCredentials: true,
      url: BASE_API + "/api/smscheck",
    }).then((res) => {
      console.log("VerifySMS_Response", res);
      if (res.status === 200) {
        navigate("/");
      } else {
        console.log(res);
      }
    });
  };

  const handleResendSMS = () => {
    axios({
      method: "POST",
      data: { number: Number(phoneNumber).toString() },
      withCredentials: true,
      url: BASE_API + "/api/smsverify",
    }).then((res) => {
      if (res.status === 200) {
        const result = res.data.result;
        setSMSRequestId(result.request_id);
      } else {
        console.log(res);
      }
    });
  };

  return (
    <div className="sms-verify-card">
      <p className="text-1">Welcome back!</p>

      <p className="text-2">
        We've sent a 6-digit code to your phone number. Please enter it below to
        continue.
      </p>

      <div className="sms-code-form">
        <p className="text-2">2FA Code</p>

        <ReactCodeInput
          className="sms-code-input"
          fields={6}
          onComplete={(value) => handleChangeCode(value)}
        />
      </div>

      <button className="loginBtn" onClick={() => handleVerifySMS()}>
        Login
      </button>

      <button className="resendSMSBtn" onClick={() => handleResendSMS()}>
        Resend SMS
      </button>
    </div>
  );
};
