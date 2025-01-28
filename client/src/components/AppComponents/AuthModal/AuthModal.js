import React from "react";
import { convertToGoogleAuth } from "../../../store/userThunks/userThunks";
import { Button, Modal, Box, Input } from "@mui/material";
import "./AuthModal.scss";
import { useDispatch, useSelector } from "react-redux";

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
};

const AuthModal = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();

  const handleGoogleAuth = () => {
    dispatch(convertToGoogleAuth());
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
        <h1>Convert Anonymous User</h1>
        <Button onClick={handleGoogleAuth}>Sign in with Google</Button>
        <div>
          <h2>Convert to Email/Password</h2>
          <form
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   const email = e.target.email.value;
          //   const password = e.target.password.value;
          //   convertAnonymousToEmail(email, password);
          // }}
          >
            <Input type="email" name="email" placeholder="Email" required />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <Button type="submit">Convert</Button>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default AuthModal;
