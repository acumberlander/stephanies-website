import React from "react";
import { useSelector } from "react-redux";
import { MyNavbar, AuthModal, Footer, AdminBar } from "../../index";
import { useModal, useIsMobile } from "../../../hooks/hooks";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./MainLayout.scss";

const MainLayout = ({ children }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isAdmin } = useSelector((state) => state.user);

  const onAdminPage = location.pathname === "/admin";

  return (
    <>
      <MyNavbar openModal={openModal} />
      {isAdmin && <AdminBar />}
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
          pauseOnHover={false}
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
