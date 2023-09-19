import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./styles.css";
import "./m.styles.css";

interface Props {
  handleProceeSMS: (type: string) => void;
}

export const ChooseProceeType: FC<Props> = ({ handleProceeSMS }) => {
  return (
    <div className="procee-types-card">
      <p className="text-1">Enhance Your Security</p>

      <p className="text-2">
        Select between SMS or Passkeys for added protection
      </p>

      <div className="images-wrapper">
        <div className="imgbtn-div">
          <button className="imgbtn" onClick={() => handleProceeSMS("PN")}>
            <img
              className="emailusimage"
              alt="EmailusImage"
              src="/img/emailus.png"
            />
          </button>

          <p className="imgbtn-text">SMS</p>
        </div>

        <div className="imgbtn-div">
          <button className="imgbtn">
            <img
              className="callusimage"
              alt="CallusImage"
              src="/img/callus.png"
            />
          </button>

          <p className="imgbtn-text">Passkeys</p>
        </div>
      </div>

      <button className="proceebtn">Proceed with Passkeys</button>

      <p className="text-3" style={{ marginTop: "20px" }}>
        <span className="text-4">Feel secure enough? </span>
        <span className="text-5">Skip for Now</span>
      </p>
    </div>
  );
};
