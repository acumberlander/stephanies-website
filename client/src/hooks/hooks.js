import { useState, useEffect } from "react";

/**
 * Modal hook that returns the modal state and functions that open and close modals.
 * @returns Modal props: isOpen, openModal (function), closeModal (function)
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return { isOpen, openModal, closeModal };
};

export const useIsMobile = (breakpoint = 900) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

export const useErrorBoundary = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const errorHandler = (event) => {
      setError(event.error);
      event.preventDefault(); // Prevents default error logging
    };

    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  return { error, setError };
};
