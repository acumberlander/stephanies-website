import React, { useState, useEffect } from "react";
import { MyNavbar, AuthModal, Footer } from "../../../components";
import { useModal, useIsMobile } from "../../../hooks/hooks";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./MainLayout.scss";

const MainLayout = ({ children }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const location = useLocation();
  const isMobile = useIsMobile();

  const onAdminPage = location.pathname === "/admin";

  return (
    <>
      <MyNavbar openModal={openModal} />
      <AuthModal isOpen={isOpen} closeModal={closeModal} />
      {isMobile ? null : (
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{
            marginTop: "60px",
            maxHeight: "40px",
            zIndex: "1",
          }}
        />
      )}

      {children}
      {!onAdminPage && <Footer />}
    </>
  );
};

export default MainLayout;
