import React, { useState, useEffect } from "react";
import { MyNavbar, AuthModal, Footer } from "../../../components";
import { useModal } from "../../../hooks/hooks";
import { useLocation } from "react-router-dom";
import "./MainLayout.scss";

const MainLayout = ({ children }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const location = useLocation();

  const onAdminPage = location.pathname === "/admin";

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
