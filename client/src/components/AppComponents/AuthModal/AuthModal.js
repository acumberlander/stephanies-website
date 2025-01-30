import React, { useState } from "react";
import { Button, Modal, Box, Input } from "@mui/material";
import "./AuthModal.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  signInWithGoogle,
  signInWithEmail,
} from "../../../store/authThunks/authThunks";
import { createUserWithEmailAndPassword } from "firebase/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
};

const AuthModal = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();
  const [isRegistered, setIsRegistered] = useState(true);

  const handleGoogleAuth = () => {
    closeModal();
    dispatch(signInWithGoogle());
  };

  const handleAuth = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    isRegistered
      ? dispatch(signInWithEmail(email, password))
      : dispatch(createUserWithEmailAndPassword(email, password));
  };

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Button id="auth-modal-close-btn" onClick={closeModal}>
          X
        </Button>
        <h2>{isRegistered ? "Sign In" : "Register"}</h2>
        <Button id="google-btn" onClick={handleGoogleAuth}>
          Sign in with Google
        </Button>
        <div>
          <h2>{isRegistered ? "Sign In" : "Sign Up"}</h2>
          <form onSubmit={handleAuth}>
            <div id="email-and-password-container">
              <Input type="email" name="email" placeholder="Email" required />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>

            <Button type="submit">
              {isRegistered ? "Sign In" : "Sign Up"}
            </Button>
          </form>
          <p
            className="toggle-link"
            onClick={() => setIsRegistered(!isRegistered)}
          >
            {isRegistered
              ? "Don't have an account? Register"
              : "Already have an account? Sign In"}
          </p>
        </div>
      </Box>
    </Modal>
  );
};

export default AuthModal;
