import React, { useState } from "react";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";

function Homepage({ user, setLoggingIn, checkLoggedStatus }) {
  const [showLogInMsg, setShowLogInMsg] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#bef7ee"
          fillOpacity="1"
          d="M0,64L9.6,90.7C19.2,117,38,171,58,160C76.8,149,96,75,115,80C134.4,85,154,171,173,224C192,277,211,299,230,266.7C249.6,235,269,149,288,128C307.2,107,326,149,346,186.7C364.8,224,384,256,403,224C422.4,192,442,96,461,85.3C480,75,499,149,518,192C537.6,235,557,245,576,213.3C595.2,181,614,107,634,101.3C652.8,96,672,160,691,165.3C710.4,171,730,117,749,101.3C768,85,787,107,806,122.7C825.6,139,845,149,864,133.3C883.2,117,902,75,922,96C940.8,117,960,203,979,208C998.4,213,1018,139,1037,133.3C1056,128,1075,192,1094,202.7C1113.6,213,1133,171,1152,170.7C1171.2,171,1190,213,1210,208C1228.8,203,1248,149,1267,154.7C1286.4,160,1306,224,1325,213.3C1344,203,1363,117,1382,106.7C1401.6,96,1421,160,1430,192L1440,224L1440,0L1430.4,0C1420.8,0,1402,0,1382,0C1363.2,0,1344,0,1325,0C1305.6,0,1286,0,1267,0C1248,0,1229,0,1210,0C1190.4,0,1171,0,1152,0C1132.8,0,1114,0,1094,0C1075.2,0,1056,0,1037,0C1017.6,0,998,0,979,0C960,0,941,0,922,0C902.4,0,883,0,864,0C844.8,0,826,0,806,0C787.2,0,768,0,749,0C729.6,0,710,0,691,0C672,0,653,0,634,0C614.4,0,595,0,576,0C556.8,0,538,0,518,0C499.2,0,480,0,461,0C441.6,0,422,0,403,0C384,0,365,0,346,0C326.4,0,307,0,288,0C268.8,0,250,0,230,0C211.2,0,192,0,173,0C153.6,0,134,0,115,0C96,0,77,0,58,0C38.4,0,19,0,10,0L0,0Z"
        ></path>
      </svg>
      <div className="flex heading-container">
        <h2 className="heading">Build Your Child's Social Circle</h2>
        {/* <h3>
        Find like minded parents with similar aged children near you and across
        the globe
      </h3> */}
      </div>
      {showLogInMsg ? (
        <div className="overlay">
          <div className="popup">
            <h3>Please Log In Or Register...</h3>
          </div>
        </div>
      ) : (
        <div className="bottom-section flex">
          <div className="balloon-wrap1">
            <div
              className="small-display-area balloon1"
              onClick={(e) => {
                if (!checkLoggedStatus()) {
                  return;
                }
                navigate("/swipe");
              }}
            >
              swipe
            </div>
          </div>

          <div className="balloon-wrap2">
            <div
              className="small-display-area balloon2"
              onClick={(e) => {
                if (!checkLoggedStatus()) {
                  return;
                }
                navigate("/events");
              }}
            >
              events
            </div>
          </div>

          <div className="balloon-wrap3">
            <div
              className="small-display-area balloon3"
              onClick={(e) => {
                if (!checkLoggedStatus()) {
                  return;
                }
                navigate("/add-event");
              }}
            >
              add-events
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
