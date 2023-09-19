import React, { FC, useState, useEffect } from "react";
import "./styles.css";
import "./m.styles.css";

export const WhyKoyComponent: FC = () => {
  return (
    <div className="whykoy">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-2">
            <p className="text-1">Building on KOY: The Advantage</p>

            <p className="text-2">
              Harnessing the Power of Africa's Premier Distributed Ledger
            </p>
          </div>

          <div className="whykoy-section-3">
            <div>
              <div className="whykoy-text-3">Harness KOY's Potential</div>

              <p className="whykoy-text-4">
                Discover tools and resources for seamless integration.
              </p>
            </div>

            <div style={{ marginTop: "37px" }}>
              <div className="whykoy-text-3">Join Our Developer Network</div>

              <p className="whykoy-text-4">
                Collaborate, innovate, and grow with a community of pioneers
              </p>
            </div>

            <div style={{ marginTop: "37px" }}>
              <div className="whykoy-text-3">Start Building Now</div>

              <p className="whykoy-text-4">
                Access our developer toolkit and bring your vision to life
              </p>
            </div>
          </div>

          <div className="ellipse-2" />
        </div>
      </div>
    </div>
  );
};
