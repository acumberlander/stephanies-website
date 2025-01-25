import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.scss";

const ErrorPage = () => {
  return (
    <div className="error-page-container">
      <h1 id="error-page-header">Something went wrong!</h1>
      <p>We encountered an error. Please try again.</p>
      <Link to="/" style={{ textDecoration: "none", color: "blue", fontSize: "1.2rem" }}>
        Go Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
