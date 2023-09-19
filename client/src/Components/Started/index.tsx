import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import "./m.styles.css";

export const StartedComponent: FC = () => {
  const navigate = useNavigate();
  const [clickedSubject, setSubject] = useState("GettingStarted");

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="started">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="wrapper">
            <div className="started-header">
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
                <p className="header-title">We’re here to help.</p>
              </div>
            </div>

            <div className="started-container">
              <div className="container-left">
                <p
                  className={`text-3 ${
                    clickedSubject === "GettingStarted" ? "clickedSubject" : ""
                  }`}
                  onClick={() => setSubject("GettingStarted")}
                >
                  Getting Started
                </p>
                <p
                  className={`text-3 ${
                    clickedSubject === "ProfileAccount" ? "clickedSubject" : ""
                  }`}
                  onClick={() => setSubject("ProfileAccount")}
                >
                  Profile & Account
                </p>
                <p
                  className={`text-3 ${
                    clickedSubject === "ContactUs" ? "clickedSubject" : ""
                  }`}
                  onClick={() => setSubject("ContactUs")}
                >
                  Contact Us
                </p>
              </div>

              <div className="container-right">
                <div
                  className={`${
                    clickedSubject === "GettingStarted" ? "" : "disabled"
                  }`}
                >
                  <p className="content-titleText">Getting Started</p>

                  <div className="line"></div>

                  <p className="content-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent vitae nisi sed nibh suscipit pellentesque a in
                    diam. Nam eleifend, velit quis imperdiet tincidunt, ante
                    augue porta ante, quis aliquam ipsum sem a arcu. Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Nullam egestas
                    purus mi, ut feugiat est dignissim ac. Donec ultrices
                    pulvinar varius. Fusce sit amet eleifend nunc. Morbi id ex
                    ante.
                    <span className="text-5">Sed eu pellentesque neque</span>.
                    Phasellus dictum semper augue, dictum hendrerit ante
                    interdum eget. Etiam ac mi ac metus blandit euismod.
                    Suspendisse bibendum urna nec sem efficitur iaculis. Mauris
                    dictum gravida libero quis lacinia.
                    <br />
                    <br /> Vivamus eu risus ac felis semper interdum. Cras ac
                    nibh nec neque lobortis fermentum. Maecenas vitae aliquam
                    ligula. Praesent scelerisque purus non mi fermentum, eget
                    consequat elit posuere. Nulla laoreet augue facilisis,
                    consequat erat vitae, bibendum urna. Cras a faucibus orci.
                    Class aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos. Orci varius natoque <br />
                    <br /> penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Pellentesque ipsum odio, malesuada quis
                    condimentum eu, pellentesque vitae nibh. Orci varius natoque
                    penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Praesent non tortor consectetur, congue velit
                    sed, hendrerit nibh. Praesent massa tellus, auctor vel
                    vehicula quis, congue id risus.
                  </p>
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
