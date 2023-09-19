import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";

import { Box, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CountryAutocomplete } from "../../MuiComponents/CountryAutocomplete";

import {
  getSignInUpModalState,
  setSignInModal,
  setSignUpModal,
  useAppDispatch,
  useAppSelector,
} from "src/store";
import { isMobileDevice } from "src/hook/isMobileDevice";

import { NewUserDataType } from "src/Types";

import "./styles.css";
import "./m.styles.css";

interface Props {
  setJoinKoyStep: Dispatch<SetStateAction<number>>;
  newUserData: NewUserDataType;
  setNewUserData: Dispatch<SetStateAction<NewUserDataType>>;
  handleRegister: () => void;
}

interface ErrorProps {
  value: boolean | string;
  errorMsg: string;
}

export const CountrySection: FC<Props> = ({
  setJoinKoyStep,
  newUserData,
  setNewUserData,
  handleRegister,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [licence, setLicence] = useState("Driver License");

  const handleChangeCountry = (value: string) => {
    setNewUserData({
      ...newUserData,
      ["country"]: value,
    });
  };

  const handleChangeLicence = (event: SelectChangeEvent) => {
    setLicence(event.target.value as string);

    setNewUserData({
      ...newUserData,
      ["id_type"]: event.target.value as string,
    });
  };

  const handleChangeNationalID = (value: string) => {
    const numberValue = Number(value);
    setNewUserData({
      ...newUserData,
      ["national_id"]: numberValue,
    });
  };

  const handleChangeReferralCode = (value: string) => {
    setNewUserData({
      ...newUserData,
      ["referral_code"]: value,
    });
  };

  const handleGoToLogin = () => {
    const isMobile = isMobileDevice();
    if (isMobile === true) {
      navigate("/login");
    } else {
      dispatch(setSignInModal(true));
      dispatch(setSignUpModal(false));
    }
  };

  return (
    <Box className="countrysection-card-container">
      <p className="text-1">Almost done!</p>

      <p className="text-2">Just a few more details, and you're all set!</p>

      <Box className="country-wrapper" sx={{ marginTop: "10px" }}>
        <p className="text-3">Country</p>

        <CountryAutocomplete
          defaultCountry="United States"
          handleChangeFunction={handleChangeCountry}
        />
      </Box>

      <Box className="country-wrapper" sx={{ marginTop: "20px" }}>
        <p className="text-3">ID Type</p>

        <Select
          id="demo-simple-select"
          value={licence}
          onChange={handleChangeLicence}
          placeholder="Driver Licence"
          sx={{
            "&.MuiInputBase-root": {
              width: "100%",
              backgroundColor: "#EBECED",
              borderRadius: "6px",
              "& .MuiOutlinedInput-input": {
                padding: "8.5px 14px !important",
              },
              "& fieldset": {
                border: "none !important",
                borderRadius: "6px",
              },
            },
          }}
        >
          <MenuItem value={"Driver License"}>Driver License</MenuItem>
          <MenuItem value={"Passport"}>Passport</MenuItem>
        </Select>

        <p className="text-5">
          Select the type of Id you will be able to provide us
        </p>
      </Box>

      <Box className="national-wrapper" sx={{ marginTop: "20px" }}>
        <p className="text-3">National ID</p>

        <input
          type="number"
          className="input-form"
          placeholder="Number"
          onChange={(e) => handleChangeNationalID(e.target.value)}
        />
        <p className="text-5">Enter your national ID number</p>
      </Box>

      <Box className="referralcode-wrapper" sx={{ marginTop: "20px" }}>
        <p className="text-3">Referral Code</p>

        <input
          type="text"
          className="input-form"
          placeholder="e.g. a1b2c"
          onChange={(e) => handleChangeReferralCode(e.target.value)}
        />
        <p className="text-5">If you received a referral code, enter it here</p>
      </Box>

      <button className="joinkeybtn" onClick={() => handleRegister()}>
        Join KOY
      </button>

      <p className="already-on-KOY-log" style={{ marginTop: "20px" }}>
        <span className="already-on-KOY-text">Already on KOY? </span>
        <span className="log-In-text" onClick={() => handleGoToLogin()}>
          Log In
        </span>
      </p>
    </Box>
  );
};
