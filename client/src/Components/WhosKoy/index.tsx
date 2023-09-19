import React, { FC, useState, useEffect } from "react";
import "./styles.css";
import "./m.styles.css";

export const WhosKoyComponent: FC = () => {
  return (
    <div className="whoskoy">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-2">
            <p className="text-1">The Minds Behind KOY</p>

            <p className="text-2">
              Meet the Visionaries Powering Africa's Digital Transformation
            </p>
          </div>

          <div className="whoskoy-section-3">
            <div>
              <div className="whoskoy-text-3">Meet the Team</div>

              <p className="whoskoy-text-4">
                Get to know the innovators steering KOY's vision.
              </p>
            </div>

            <div style={{ marginTop: "37px" }}>
              <div className="whoskoy-text-3">Our Story & Journey</div>

              <p className="whoskoy-text-4">
                Explore the genesis and evolution of KOY.
              </p>
            </div>

            <div style={{ marginTop: "37px" }}>
              <div className="whoskoy-text-3">Join Our Mission</div>

              <p className="whoskoy-text-4">
                Be part of the movement reshaping Africa's digital frontier.
              </p>
            </div>
          </div>

          <div className="ellipse-2" />
        </div>
      </div>
    </div>
  );
};
