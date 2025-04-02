import React from "react";
import { useNavigate } from "react-router-dom";

const AdminBar = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/admin")}
      style={{
        backgroundColor: "#98FB98",
        textAlign: "center",
        padding: "4px 0",
        cursor: "pointer",
        fontWeight: "bold",
        letterSpacing: "1px",
        fontSize: "0.85rem",
        color: "#000",
      }}
    >
      ADMIN
    </div>
  );
}

export default AdminBar