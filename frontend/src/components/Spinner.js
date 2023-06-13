import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path }) => {
  const [timer, setTimer] = useState(4);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    if (timer === 0) {
      navigate(`${path ? path : "login"}`, {
        state: location.pathname,
      });
    }
    return () => clearInterval(interval);
  }, [timer, navigate, location, path]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#031927", color: "#fff" }}
    >
      <h1 className="Text-center">
        redirecting to login page in {timer} seconds...
      </h1>
      <div className="d-flex flex-row">
        <div className="spinner-grow text-primary" role="status"></div>
        <div className="spinner-grow text-secondary" role="status"></div>
        <div className="spinner-grow text-success" role="status"></div>
      </div>
    </div>
  );
};

export default Spinner;
