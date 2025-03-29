import React from "react";
import { CircularProgress } from "@mui/material";
import "./LoadingScreen.scss";

const LoadingScreen = () => {
  return (
    <div className="loading-screen-container">
      <h1 className="loading-text">Loading...</h1>
      <CircularProgress size={80} sx={{ color: "#cc34ab" }} />
    </div>
  );
};

export default LoadingScreen;