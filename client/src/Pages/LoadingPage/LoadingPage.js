import React from "react";
import { CircularProgress } from "@mui/material";
import "./LoadingPage.scss";

const LoadingPage = () => {
  return (
    <div className="loading-page-container">
      <h1 className="loading-text">Loading...</h1>
      <CircularProgress size={80} sx={{ color: "#cc34ab" }} />
    </div>
  );
};

export default LoadingPage;