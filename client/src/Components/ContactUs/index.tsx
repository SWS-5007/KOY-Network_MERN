import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import "./m.styles.css";

export const ContactUsComponent: FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="contactUs">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="wrapper">
            <div className="contactUs-header">
              <div className="header-section_1">
                <img
                  className="logo-image"
                  alt="Image"
                  src="/img/image-2.png"
                />

                <div className="back" onClick={() => handleGoBack()}>
                  <svg
                    className="backIcon"
                    width="5"
                    height="9"
                    viewBox="0 0 5 9"
                    fill="#FFF"
                  >
                    <path
                      d="M4.75575 1.53628C5.0813 1.18499 5.0813 0.614894 4.75575 0.263597C4.59297 0.0878992 4.37983 0 4.16659 0C3.95335 0 3.74021 0.0878992 3.57743 0.263698L0.244162 3.86366C-0.0813874 4.21495 -0.0813874 4.78505 0.244162 5.13634L3.57743 8.7363C3.90298 9.0879 4.43029 9.0879 4.75584 8.7363C5.08139 8.38501 5.08139 7.81491 4.75584 7.46362L2.01172 4.49995L4.75575 1.53628Z"
                      fill="white"
                    />
                  </svg>
                  &nbsp;&nbsp;Back
                </div>
              </div>

              <div className="header-section_2">
                <p className="header-title">Contact us</p>
              </div>
            </div>

            <div className="contactUs-container">
              <div className="container-section_1">
                <div className="section_1-email">
                  <p className="email-title text-3">Email us</p>

                  <img
                    className="emailusimage"
                    alt="EmailusImage"
                    src="/img/emailus.png"
                  />

                  <p className="email-des text-4" style={{ marginTop: "14px" }}>
                    Send us an email, and we’ll get back to you in less than 24
                    hours.
                  </p>

                  <span className="email-support text-5">Email Support</span>
                </div>

                <div className="section_1-call">
                  <p className="email-title text-3">Call us</p>

                  <img
                    className="callusimage"
                    alt="CallusImage"
                    src="/img/callus.png"
                  />

                  <p className="call-des text-4" style={{ marginTop: "14px" }}>
                    Available Monday through Friday from 9 AM to 6 PM GMT
                  </p>

                  <span className="email-support text-5">(517) 746 3891</span>
                </div>
              </div>

              <div className="container-section_2">
                <p className="email-title text-3">Get in touch with us</p>

                <div className="container-section_2-line"></div>

                <div className="section_2-overlap">
                  <div className="overlap_1">
                    <p className="text-6">
                      Press & Editorial <br />
                      If you are a journalist and want to write about KOY{" "}
                    </p>

                    <p className="text-7">pr@koynetwork.com</p>
                  </div>

                  <div className="overlap_2">
                    <p className="text-6">
                      General Inquiries <br />
                      For general questions about KOY{" "}
                    </p>

                    <p className="text-7">hello@koynetwork.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ellipse-2" />
      </div>
    </div>
  );
};
