import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";

import { Box, Typography, Divider } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { CountryAutocomplete } from "../../MuiComponents/CountryAutocomplete";
import { setProfile, useAppDispatch } from "src/store";
import { isValidEmail } from "src/hook/isValidEmail";
import { updateProfileApi } from "src/Api";

import "./styles.css";
import "./m.styles.css";

interface Props {
  currentUserData: any;
  setCurrentUserData: Dispatch<SetStateAction<any>>;
  // handleRegister: () => void;
}

interface ErrorProps {
  value: boolean | string;
  errorMsg: string;
}

export const Profile: FC<Props> = ({ currentUserData, setCurrentUserData }) => {
  const dispatch = useAppDispatch();
  const [NewUserData, setNewUserData] = useState<any | null>(null);

  useEffect(() => {
    setNewUserData(currentUserData);
  }, [currentUserData]);

  const [error, setError] = useState<ErrorProps>({
    value: false,
    errorMsg: "",
  });

  const handleChangeName = (key: string, value: string) => {
    setNewUserData({
      ...NewUserData,
      [key]: value,
    });
  };

  const handleChangeEmail = (email: string) => {
    if (isValidEmail(email) || email === "") {
      setError({
        value: false,
        errorMsg: "",
      });

      setNewUserData({
        ...NewUserData,
        ["email"]: email,
      });
    } else {
      setError({
        value: "email",
        errorMsg: "Invalid email address!",
      });
    }
  };

  const handleChangeCountry = (value: string) => {
    setNewUserData({
      ...NewUserData,
      ["country"]: value,
    });
  };

  const [licence, setLicence] = useState("");
  const handleChangeLicence = (event: SelectChangeEvent) => {
    setLicence(event.target.value as string);

    setNewUserData({
      ...NewUserData,
      ["id_type"]: event.target.value as string,
    });
  };

  const handleChangeNationalID = (value: string) => {
    const numberValue = Number(value);
    setNewUserData({
      ...NewUserData,
      ["national_id"]: numberValue,
    });
  };

  const handleUpdateProfile = async () => {
    try {
      const updatedProfile = await updateProfileApi(NewUserData);
      dispatch(setProfile(updatedProfile.data.user));
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  return (
    <Box className="setting-list-content-profile">
      <Box className="setting-profile-wrapper">
        <Box className="content-title">
          <Typography variant="body1" className="content-title-1">
            My Profile
          </Typography>

          <Typography variant="body1" className="content-title-2">
            Manage Your Personal and Account Details
          </Typography>
        </Box>

        <Box className="content-main">
          <Box className="main_child child_1">
            <Typography variant="body1" className="main_child_title">
              Full Name
              <span>
                <br />
                As it appears on your ID
              </span>
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "50%",
              }}
            >
              <input
                type="text"
                className="setting_input first_name"
                defaultValue={NewUserData && NewUserData.firstname}
                onChange={(e) => handleChangeName("firstname", e.target.value)}
              />

              <input
                type="text"
                className="setting_input last_name"
                defaultValue={NewUserData && NewUserData.lastname}
                onChange={(e) => handleChangeName("lastname", e.target.value)}
              />
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: "white", margin: "10px 0px" }} />

          <Box className="main_child child_2">
            <Typography variant="body1" className="main_child_title">
              KOY Account
            </Typography>

            <Box
              sx={{
                width: "50%",
              }}
            >
              <input
                type="text"
                className="setting_input koy_account"
                defaultValue="1mir.user"
              />
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: "white", margin: "10px 0px" }} />

          <Box className="main_child child_2">
            <Typography variant="body1" className="main_child_title">
              Email
            </Typography>

            <Box
              sx={{
                width: "50%",
              }}
            >
              <input
                type="text"
                className="setting_input email"
                defaultValue={NewUserData && NewUserData.email}
                onChange={(e) => handleChangeEmail(e.target.value)}
              />

              <p
                className={`errorMsg ${error.value === "email" ? "" : "none"}`}
              >
                {error.errorMsg}
              </p>
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: "white", margin: "10px 0px" }} />

          <Box className="main_child child_2">
            <Typography variant="body1" className="main_child_title">
              Country
            </Typography>

            <Box
              className="main_child_countryselect"
              sx={{
                width: "50%",
              }}
            >
              <CountryAutocomplete
                defaultCountry={NewUserData && NewUserData.country}
                handleChangeFunction={handleChangeCountry}
              />
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: "white", margin: "10px 0px" }} />

          <Box className="main_child child_1">
            <Typography variant="body1" className="main_child_title">
              ID Type
              <span>
                <br />
                Select the type of ID you will be able to provide us
              </span>
            </Typography>

            <Box
              className="main_child_driverlicenceselect"
              sx={{
                width: "50%",
              }}
            >
              <Select
                value={NewUserData ? NewUserData.id_type : ""}
                onChange={handleChangeLicence}
                sx={{
                  "&.MuiInputBase-root": {
                    width: "100%",
                    borderRadius: "6px",
                    "& .MuiOutlinedInput-input": {
                      padding: "8px 14px !important",
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
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: "white", margin: "10px 0px" }} />

          <Box className="main_child child_1">
            <Typography variant="body1" className="main_child_title">
              National ID
              <span>
                <br />
                Enter your national ID number
              </span>
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "50%",
              }}
            >
              <input
                type="number"
                className="setting_input national_id"
                defaultValue={NewUserData && NewUserData.national_id}
                onChange={(e) => handleChangeNationalID(e.target.value)}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider
        sx={{
          position: "relative",
          width: "calc(100% + 40px)",
          left: "-20px",
          backgroundColor: "white",
          margin: "20px 0px",
        }}
      />

      <Box className="setting-profile-btns">
        <button onClick={() => handleCancel()}>Cancel</button>

        <button onClick={() => handleUpdateProfile()}>Save</button>
      </Box>
    </Box>
  );
};
