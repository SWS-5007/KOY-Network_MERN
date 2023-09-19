import React, { FC, useState, useEffect } from "react";
import "./styles.css";
import "./m.styles.css";

export const HomeComponent: FC = () => {
  const [currentWindowWidth, getCurrentWindowWidth] = useState(
    window.innerWidth
  );

  const handleResizeWindow = () => {
    const { innerWidth, innerHeight } = window;
    getCurrentWindowWidth(innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResizeWindow);

    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  return (
    <div className="home">
      <div className="overlap-wrapper">
        <div className="overlap">
          <img
            className="image-1"
            alt="image-1"
            src="/img/box-readyv1-2-compressed-2.png"
          />
          {/* <img className="image" alt="Image" src="/img/image-3.png" /> */}
          <div className="home-female-image"></div>

          <div className="overlap-2">
            <p className="revolutionising">
              Revolutionising Africa <br />
              with a Robust Distributed <br />
              Ledger for Smartphone Apps
            </p>

            <p className="m-revolutionising">
              Revolutionising Africa with a Robust Distributed Ledger for
              Smartphones
            </p>

            <p className="text-wrapper-14 m-text-empowering">
              Empowering Connections: Bridging Africa with the World
            </p>

            <p className="text-wrapper-14 m-text-through">
              Through Seamless Digital Integration
            </p>
          </div>

          <button className="home-btns">Why build on KOY</button>

          <div className="home-section-3">
            <div>
              <div className="home-text-3">Seamless Transactions</div>

              <p className="home-text-4">
                <span className="span">
                  Experience the Power of Instant, Secure, and Transparent
                  Exchanges Across Borders{" "}
                </span>
                <span className="home-text-5">More &gt;&gt;</span>
              </p>
            </div>

            <div>
              <div className="home-text-3">App Integration Made Easy</div>

              <p className="home-text-4">
                <span className="span">
                  Unlock the Potential of Your Smartphone Apps with KOY&#39;s
                  Robust Ledger Infrastructure{" "}
                </span>
                <span className="home-text-5">More &gt;&gt;</span>
              </p>
            </div>

            <div>
              <div className="home-text-3">Celebrating African Innovation</div>

              <p className="home-text-4">
                <span className="span">
                  Amplifying the Voices and Visions of a Continent on the
                  Rise&nbsp;&nbsp;
                </span>
                <span className="home-text-5">More &gt;&gt;</span>
              </p>
            </div>
          </div>

          <p className="insert-more">
            {"{"} {"{"} Insert more marketing stuff here {"}"} {"}"}
          </p>
          <div className="ellipse-2" />
        </div>
      </div>
    </div>
  );
};
