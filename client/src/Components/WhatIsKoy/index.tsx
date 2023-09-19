import React, { FC, useState, useEffect } from "react";
import "./styles.css";
import "./m.styles.css";

export const WhatIsKoyComponent: FC = () => {
  return (
    <div className="whatiskoy">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="whatiskoy-female-image"></div>

          <div className="overlap-2">
            <p className="text-1">Discover KOY</p>

            <p className="text-2">
              Bridging Digital Innovation with Africa's Global Pulse
            </p>
          </div>

          <div className="whatiskoy-section-3">
            <div>
              <div className="whatiskoy-text-3">Dive Deeper into KOY</div>

              <p className="whatiskoy-text-4">
                Explore the tech and tales that drive our platform.
              </p>
            </div>

            <div style={{ marginTop: "37px" }}>
              <div className="whatiskoy-text-3">
                Connect with the KOY Community
              </div>

              <p className="whatiskoy-text-4">
                Join forums, webinars, and events. Be part of the conversation
              </p>
            </div>

            <div style={{ marginTop: "37px" }}>
              <div className="whatiskoy-text-3">Get Started Today</div>

              <p className="whatiskoy-text-4">
                Begin your journey with Africa's leading digital ledger.
              </p>
            </div>
          </div>

          <div className="ellipse-2" />
        </div>
      </div>
    </div>
  );
};
