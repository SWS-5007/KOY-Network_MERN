import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import "./styles.css";
import "./m.styles.css";

const BASE_API = process.env.REACT_APP_BASE_API;

interface Props {
  handleProceeSMS: (type: string) => void;
  setSMSRequestId: (type: string) => void;
  phoneNumber: string | undefined;
  setPhoneNumber: (type: string | undefined) => void;
}

export const PhoneNumber: FC<Props> = ({
  handleProceeSMS,
  setSMSRequestId,
  phoneNumber,
  setPhoneNumber,
}) => {
  const handlePhoneChange = (value: string | undefined) => {
    console.log("Selected_PhoneNumber", value, Number(value).toString());
    setPhoneNumber(value);
  };

  const handleSendSMS = () => {
    axios({
      method: "POST",
      data: { number: Number(phoneNumber).toString() },
      withCredentials: true,
      url: BASE_API + "/api/smsverify",
    })
      .then((res) => {
        console.log("SendSMS_Response", res);
        if (res.status === 200) {
          const result = res.data.result;
          setSMSRequestId(result.request_id);

          handleProceeSMS("VS");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="phone-number-card">
      <p className="text-1">Phone Number</p>

      <p className="text-2">Type your phone number.</p>

      <div className="phone-number-dev">
        <PhoneInput
          className="phone-number-input"
          placeholder="Enter phone number"
          value={phoneNumber}
          defaultCountry="US"
          onChange={(value) => handlePhoneChange(value)}
        />
      </div>

      <button className="proceebtn" onClick={() => handleSendSMS()}>
        Send SMS
      </button>

      <p className="text-3" style={{ marginTop: "20px" }}>
        <span className="text-4">Feel secure enough? </span>
        <span className="text-5">Skip for Now</span>
      </p>
    </div>
  );
};
