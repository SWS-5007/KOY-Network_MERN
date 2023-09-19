import React, { FC } from "react";
import { Link as ReactRouteLink } from "react-router-dom";

import "./styles.css";
import "./m.styles.css";

export const Footer: FC = () => {
  return (
    <div className="footer">
      <img
        className="box-readyv"
        alt="Box"
        src="/img/box-readyv1-2-compressed-8.png"
      />

      <div className="footer-wrapper">
        <div className="footer_wrapper_1">
          <div className="footer-child_1">
            <img className="img" alt="Image" src="/img/image-2.png" />

            <p className="text_2 text-4">
              A distributed ledger system designed to support smartphone apps
              serving Africa and its diaspora situated across the globe
            </p>
          </div>

          <div className="footer-child_2">
            <div className="footer-child_2_1">
              <div className="text_1">KOY</div>

              <ReactRouteLink
                to="/whatIsKoy"
                style={{
                  textDecoration: "none",
                }}
              >
                <div className="text_2" style={{ marginTop: "33px" }}>
                  What is KOY
                </div>
              </ReactRouteLink>

              <ReactRouteLink
                to="/whyKoy"
                style={{
                  textDecoration: "none",
                }}
              >
                <div className="text_2" style={{ marginTop: "5px" }}>
                  Why build on KOY
                </div>
              </ReactRouteLink>

              <ReactRouteLink
                to="/whosKoy"
                style={{
                  textDecoration: "none",
                }}
              >
                <div className="text_2" style={{ marginTop: "5px" }}>
                  Who’s behind KOY
                </div>
              </ReactRouteLink>
            </div>

            <div className="footer-child_2_2">
              <div className="text_1">Help</div>
              <div className="text_2" style={{ marginTop: "33px" }}>
                Help Centre
              </div>

              <ReactRouteLink
                to="/policies"
                style={{
                  textDecoration: "none",
                }}
              >
                <div className="text_2" style={{ marginTop: "5px" }}>
                  Terms of Service
                </div>
              </ReactRouteLink>

              <div className="text_2" style={{ marginTop: "5px" }}>
                <a
                  href="https://koy.network/privacy-policy"
                  target="_blank"
                  style={{ textDecoration: "none", color: "unset" }}
                >
                  Privacy Policy
                </a>
              </div>
              <div className="text_2" style={{ marginTop: "5px" }}>
                Contact Us
              </div>
            </div>
          </div>
        </div>

        <div className="footer_wrapper_2">
          <p className="p">2023 KOY Networks Ltd. All rights reserved.</p>

          <div className="footer_sociallinks">
            <a
              href="https://twitter.com/koynetwork"
              target="_blank"
              style={{ textDecoration: "none", color: "unset" }}
            >
              X(Twitter)
            </a>

            <a
              href="https://web.facebook.com/koynetwork/"
              target="_blank"
              style={{ textDecoration: "none", color: "unset" }}
            >
              Facebook
            </a>

            <a
              href="https://t.me/KOYNetwork"
              target="_blank"
              style={{ textDecoration: "none", color: "unset" }}
            >
              Telegram
            </a>

            <a
              href="https://medium.com/@koynetwork"
              target="_blank"
              style={{ textDecoration: "none", color: "unset" }}
            >
              Medium
            </a>

            <p className="facebook-telegram">Switch to Light Mode</p>
          </div>
        </div>
      </div>

      <div className="m-footer-wrapper">
        <div className="m-footer_wrapper_1">
          <img className="img" alt="Image" src="/img/image-2.png" />

          <p className="m-text_2 m-text-4">
            A distributed ledger system designed to support smartphone apps
            serving Africa and its diaspora situated across the globe
          </p>

          <p className="m-p">2023 KOY Networks Ltd. All rights reserved.</p>
        </div>

        <div className="m-footer-child_2">
          <div className="m-footer-child_2_1">
            <div className="m-text_1">KOY</div>

            <ReactRouteLink
              to="/whatIsKoy"
              style={{
                textDecoration: "none",
              }}
            >
              <div className="m-text_2" style={{ marginTop: "20px" }}>
                What is KOY
              </div>
            </ReactRouteLink>

            <ReactRouteLink
              to="/whyKoy"
              style={{
                textDecoration: "none",
              }}
            >
              <div className="m-text_2" style={{ marginTop: "5px" }}>
                Why build on KOY
              </div>
            </ReactRouteLink>

            <ReactRouteLink
              to="/whosKoy"
              style={{
                textDecoration: "none",
              }}
            >
              <div className="m-text_2" style={{ marginTop: "5px" }}>
                Who’s behind KOY
              </div>
            </ReactRouteLink>
          </div>

          <div className="m-footer-child_2_2">
            <div className="m-text_1">Help</div>
            <div className="m-text_2" style={{ marginTop: "20px" }}>
              Help Centre
            </div>

            <ReactRouteLink
              to="/policies"
              style={{
                textDecoration: "none",
              }}
            >
              <div className="m-text_2" style={{ marginTop: "5px" }}>
                Terms of Service
              </div>
            </ReactRouteLink>

            <div className="m-text_2" style={{ marginTop: "5px" }}>
              <a
                href="https://koy.network/privacy-policy"
                target="_blank"
                style={{ textDecoration: "none", color: "unset" }}
              >
                Privacy Policy
              </a>
            </div>
            <div className="m-text_2" style={{ marginTop: "5px" }}>
              Contact Us
            </div>
          </div>
        </div>

        <div className="m-footer_wrapper_2">
          <div className="m-footer_sociallinks">
            <a
              href="https://twitter.com/koynetwork"
              target="_blank"
              style={{ textDecoration: "none", color: "unset" }}
            >
              X(Twitter)
            </a>

            <a
              href="https://web.facebook.com/koynetwork/"
              target="_blank"
              style={{ textDecoration: "none", color: "unset" }}
            >
              Facebook
            </a>

            <a
              href="https://t.me/KOYNetwork"
              target="_blank"
              style={{ textDecoration: "none", color: "unset" }}
            >
              Telegram
            </a>

            <a
              href="https://medium.com/@koynetwork"
              target="_blank"
              style={{ textDecoration: "none", color: "unset" }}
            >
              Medium
            </a>

            <p className="facebook-telegram">Switch to Light Mode</p>
          </div>
        </div>
      </div>
    </div>
  );
};
