import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminTab.scss";

const AdminBar = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-tab-container">
      <div
        className="admin-tab"
        onClick={() => navigate("/admin")}
      >
        ADMIN
      </div>
    </div>
  );
};

export default AdminBar;
