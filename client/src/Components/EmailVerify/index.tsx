import React, { FC, useState, useEffect, Fragment } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  setProfile,
  setSignUpModal,
  setSignInModal,
  useAppDispatch,
  useAppSelector,
} from "src/store";
import { isMobileDevice } from "src/hook/isMobileDevice";

import "./styles.css";
import "./m.styles.css";

const BASE_API = process.env.REACT_APP_BASE_API;

export const EmailVerify: FC = () => {
  const [emailVerifyStatus, setVerifyStatus] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const param = useParams();

  const verifyEmailUrl = async () => {
    try {
      const url = `${BASE_API}/api/${param.id}/verify/${param.token}`;
      const { data } = await axios.get(url);
      if (data.message === "Email Verified!") {
        setVerifyStatus(true);
      }
    } catch (error) {
      console.log("Email Verify Error", error);
      setVerifyStatus(false);
    }
  };

  useEffect(() => {
    verifyEmailUrl();
  }, [param]);

  const handleGoToLogin = () => {
    const isMobile = isMobileDevice();
    if (isMobile === true) {
      navigate("/login");
    } else {
      navigate("/");
      dispatch(setSignInModal(true));
      dispatch(setSignUpModal(false));
    }
  };

  return (
    <Fragment>
      {emailVerifyStatus ? (
        <div className="emailverify-container">
          <div className="card">
            <p className="text_1">Success!</p>
            <p className="text_2">Email </p>
            <p className="text_2" style={{ marginTop: "30px" }}>
              Thanks for verifying your email. <br />
              Welcome aboard!{" "}
            </p>

            <button className="login_btn" onClick={() => handleGoToLogin()}>
              Login
            </button>
          </div>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
};
