import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const DeleteConfirmationModal = ({
  deleteDialogOpen,
  handleDeleteCancel,
  handleDeleteConfirm,
  productToDelete,
}) => {
  return (
    <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
      <DialogTitle>Delete Product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to permanently delete "{productToDelete?.name}
          "? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteCancel}>Cancel</Button>
        <Button onClick={handleDeleteConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
