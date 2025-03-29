import React, { useState, useEffect } from "react";
import "./MainLayout.scss";
import { MyNavbar, AuthModal, Footer } from "../../../components";
import { useModal } from "../../../hooks/hooks";

const MainLayout = ({ children }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [onAdminPage, setOnAdminPage] = useState(false);

  useEffect(() => {
    setOnAdminPage(window.location.pathname === "/admin");
  }, []);

  return (
    <>
      <MyNavbar openModal={openModal} />
      <AuthModal isOpen={isOpen} closeModal={closeModal} />
      {children}
      {!onAdminPage && <Footer />}
    </>
  );
};

export default MainLayout;
