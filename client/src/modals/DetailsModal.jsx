import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TransactionView from "../components/AdminComponents/TransactionView/TransactionView";
import InvoiceView from "../components/AdminComponents/InvoiceView/InvoiceView";

const DetailsModal = ({
  selectedIndex,
  closeDetails,
  next,
  prev,
  selectedTransaction,
  filteredTransactions,
  isMobile,
}) => {
  const [viewMode, setViewMode] = useState("transaction");

  return (
    <Dialog
      open={selectedIndex !== null}
      onClose={closeDetails}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          height: isMobile ? "90vh" : "700px",
          m: isMobile ? 1 : "auto",
          borderRadius: 3,
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          fontWeight: 600,
          fontSize: "1.1rem",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          {viewMode === "transaction" ? "Transaction Details" : "Invoice"}
        </Box>
        <IconButton onClick={closeDetails}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box display="flex" gap={0} sx={{ padding:  "15px"}}>
        <Button
          size="small"
          variant="outlined"
          sx={{
            width: "50%",
            borderRadius: "10px 0 0 10px",
            border: "none",
            backgroundColor: viewMode === "transaction" ? "#cc34ab" : "#a66498",
            color: "#fff",
          }}
          onClick={() => setViewMode("transaction")}
        >
          Transaction
        </Button>
        <Button
          size="small"
          variant="outlined"
          sx={{
            width: "50%",
            borderRadius: "0 10px 10px 0",
            border: "none",
            backgroundColor: viewMode === "invoice" ? "#cc34ab" : "#a66498",
            color: "#fff",
          }}
          onClick={() => setViewMode("invoice")}
        >
          Invoice
        </Button>
      </Box>
      {selectedTransaction && (
        <DialogContent
          dividers
          sx={{
            px: 4,
            py: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            backgroundColor: "#fff",
          }}
        >
          {viewMode === "transaction" ? (
            // 💳 Transaction View
            <TransactionView selectedTransaction={selectedTransaction} />
          ) : (
            // 📄 Invoice View
            <InvoiceView selectedTransaction={selectedTransaction} />
          )}
        </DialogContent>
      )}

      <DialogActions sx={{ justifyContent: "space-between", px: 4, py: 2 }}>
        <Button
          onClick={prev}
          disabled={selectedIndex <= 0}
          startIcon={<ArrowBackIosNewIcon />}
        >
          Previous
        </Button>
        <Button
          onClick={next}
          disabled={selectedIndex >= filteredTransactions.length - 1}
          endIcon={<ArrowForwardIosIcon />}
        >
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailsModal;
