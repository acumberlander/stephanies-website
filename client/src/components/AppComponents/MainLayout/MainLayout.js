import React from "react";
import { ToastContainer } from "react-toastify";
import { useIsMobile, useModal } from "../../../hooks/hooks";
import { MyNavbar, AuthModal, Footer } from "../../../components";
import "./MainLayout.scss";

const MainLayout = ({ children }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { isMobile } = useIsMobile();

  return (
    <>
      <MyNavbar openModal={openModal} />
      <AuthModal isOpen={isOpen} closeModal={closeModal} />
      {!isMobile && <ToastContainer className="toast-container" />}
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
