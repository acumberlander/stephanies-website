// context/ModalContext.js
import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newMember, setNewMember] = useState(false);

  const openModal = (isNewMember) => {
    setNewMember(isNewMember);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, newMember, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};
