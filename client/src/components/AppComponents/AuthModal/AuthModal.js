import React, { useState } from "react";
import { Button, Modal, Box, Input } from "@mui/material";
import "./AuthModal.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  signInWithGoogle,
  signInWithEmail,
  registerWithEmail,
} from "../../../store/authThunks/authThunks";
import CancelIcon from "@mui/icons-material/Cancel";

const googleIcon = require("../../../assets/icons/icons8-google-48.png");

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
    let firstName;
    let lastName;
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!isRegistered) {
      firstName = e.target.firstName.value;
      lastName = e.target.lastName.value;
    }
    isRegistered
      ? dispatch(signInWithEmail({ email, password }))
      : dispatch(registerWithEmail({ email, password, firstName, lastName }));
  };

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box id="modal-container" sx={style}>
        <CancelIcon onClick={closeModal} id="auth-modal-close-btn" />
        <h2>{isRegistered ? "Sign In" : "Register"}</h2>
        <div id="google-auth-container">
          <Button id="google-btn" onClick={handleGoogleAuth}>
            <img id="google-logo" src={googleIcon} alt="google-logo" />
            <span>{isRegistered ? "Sign In" : "Sign Up"} with Google</span>
          </Button>
        </div>
        <hr id="modal-divider" />
        <div>
          <h2>{isRegistered ? "Sign In" : "Sign Up"}</h2>
          <form onSubmit={handleAuth}>
            <div id="email-and-password-container">
              {!isRegistered ? (
                <>
                  <Input
                    type="name"
                    name="firstName"
                    placeholder="First Name"
                    required
                  />
                  <Input
                    type="name"
                    name="lastName"
                    placeholder="Last Name"
                    required
                  />
                </>
              ) : null}
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
